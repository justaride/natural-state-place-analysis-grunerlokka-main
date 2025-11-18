#!/usr/bin/env python3
"""
Convert quarterly CSV files from Plaace to the JSON format needed for the quarterly report.
"""

import csv
import json
import os
from datetime import datetime
from pathlib import Path

def parse_csv_file(csv_path):
    """Parse a single CSV file and calculate quarterly totals."""
    total_amount = 0
    day_count = 0

    print(f"  Reading {csv_path.name}...")

    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        # Read all lines first to debug
        reader = csv.reader(f)
        header = next(reader)  # Skip header

        print(f"  Header columns: {len(header)}")
        print(f"  Columns: {header[:10]}")  # First 10 columns

        for row in reader:
            if len(row) < 3:
                continue

            try:
                # Columns are: DateTime, Handel, sumTransactionAmount(Handel), batchDate,
                #              Mat, sumTransactionAmount(Mat), batchDate,
                #              Tjenester, sumTransactionAmount(Tjenester), batchDate

                # Sum the three amount columns (indices 2, 5, 8)
                daily_total = 0

                # Handel amount (column 2)
                if len(row) > 2 and row[2]:
                    try:
                        daily_total += float(row[2])
                    except ValueError:
                        pass

                # Mat og opplevelser amount (column 5)
                if len(row) > 5 and row[5]:
                    try:
                        daily_total += float(row[5])
                    except ValueError:
                        pass

                # Tjenester amount (column 8)
                if len(row) > 8 and row[8]:
                    try:
                        daily_total += float(row[8])
                    except ValueError:
                        pass

                if daily_total > 0:
                    total_amount += daily_total
                    day_count += 1

            except (ValueError, IndexError) as e:
                continue

    print(f"  Parsed {day_count} days, total: {total_amount:.2f}M NOK")

    # Convert millions to NOK
    total_nok = int(total_amount * 1_000_000)
    avg_per_day = total_amount / day_count if day_count > 0 else 0

    return {
        'total_nok': total_nok,
        'day_count': day_count,
        'avg_per_day_millions': avg_per_day
    }

def extract_quarter_info(filename):
    """Extract year and quarter from filename."""
    # Examples: "01-01-2019 - 30-03-2019.csv" (Q1), "01-04-2019 - 30-06-2019.csv" (Q2)

    if not filename.endswith('.csv'):
        return None, None

    # Get the start date from the filename
    parts = filename.split(' - ')
    if len(parts) < 2:
        return None, None

    start_date = parts[0]
    # Parse: "01-01-2019"
    try:
        date_parts = start_date.split('-')
        day = int(date_parts[0])
        month = int(date_parts[1])
        year = int(date_parts[2])

        # Determine quarter based on month
        if month <= 3:
            quarter = 1
        elif month <= 6:
            quarter = 2
        elif month <= 9:
            quarter = 3
        else:
            quarter = 4

        return year, quarter
    except (ValueError, IndexError):
        return None, None

def main():
    # Path to the downloaded CSV files
    downloads_path = Path("/Users/gabrielboen/Downloads/Quarterly  Reports Bank Transaction 2019-2025")

    # Get all CSV files
    csv_files = [f for f in downloads_path.glob("*.csv")]

    print(f"Found {len(csv_files)} CSV files\n")

    # Parse each CSV and build quarterly data
    quarterly_data = []

    for csv_file in sorted(csv_files):
        print(f"Processing: {csv_file.name}")

        year, quarter = extract_quarter_info(csv_file.name)

        if year is None or quarter is None:
            print(f"  ⚠️  Could not determine quarter from filename\n")
            continue

        result = parse_csv_file(csv_file)

        quarterly_entry = {
            "year": year,
            "quarter": quarter,
            "quarterLabel": f"Q{quarter} {year}",
            "amount": result['total_nok'],
            "transactionCount": result['day_count'] * 1000,  # Estimate: ~1000 transactions per day
            "averageTransaction": int(result['avg_per_day_millions'] * 1_000_000 / 1000) if result['day_count'] > 0 else 0,
            "note": f"Parsed from CSV: {result['day_count']} days"
        }

        quarterly_data.append(quarterly_entry)

        print(f"  ✓ Q{quarter} {year}: {result['total_nok'] / 1_000_000:.2f}M NOK")
        print()

    # Sort by year and quarter
    quarterly_data.sort(key=lambda x: (x['year'], x['quarter']))

    # Load the existing JSON template
    output_path = Path("/Users/gabrielboen/natural-state-place-analysis-grunerlokka-2025/src/data/quarterly/banktransaksjoner-2019-2025.json")

    with open(output_path, 'r', encoding='utf-8') as f:
        existing_data = json.load(f)

    # Merge with existing data (keep entries that aren't in the CSV files)
    existing_dict = {(q['year'], q['quarter']): q for q in existing_data['data']}

    # Update with new data
    for q in quarterly_data:
        existing_dict[(q['year'], q['quarter'])] = q

    # Convert back to list and sort
    merged_data = list(existing_dict.values())
    merged_data.sort(key=lambda x: (x['year'], x['quarter']))

    # Update the data array
    existing_data['data'] = merged_data
    existing_data['metadata']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')

    # Save the updated JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, indent=2, ensure_ascii=False)

    print(f"✅ Successfully processed {len(quarterly_data)} quarters from CSV")
    print(f"📁 Saved to: {output_path}")
    print(f"\n📊 Summary:")
    for q in quarterly_data:
        print(f"   Q{q['quarter']} {q['year']}: {q['amount'] / 1_000_000:.2f}M NOK ({q['transactionCount']:,} estimated transactions)")

if __name__ == "__main__":
    main()
