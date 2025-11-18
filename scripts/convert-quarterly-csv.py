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
    transaction_count = 0
    daily_amounts = []

    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Sum up all three categories: Handel, Mat og opplevelser, Tjenester
            handel = float(row.get('sumTransactionAmount', 0) or 0)
            mat = float(row.get('sumTransactionAmount', 0) or 0)  # Column index differs
            tjenester = float(row.get('sumTransactionAmount', 0) or 0)

            # Actually, looking at the CSV structure, we need to use the correct column indices
            # Let's get all numeric values and sum them (they're in millions already)
            try:
                # The CSV has: Handel amount, Mat amount, Tjenester amount
                # Columns are: DateTime, Handel, sumTransactionAmount, ...
                values = list(row.values())
                # Get positions 2, 5, 8 which are the sumTransactionAmount columns
                daily_total = 0
                if len(values) > 2 and values[2]:
                    daily_total += float(values[2])
                if len(values) > 5 and values[5]:
                    daily_total += float(values[5])
                if len(values) > 8 and values[8]:
                    daily_total += float(values[8])

                if daily_total > 0:
                    total_amount += daily_total
                    transaction_count += 1
                    daily_amounts.append(daily_total)
            except (ValueError, IndexError):
                continue

    avg_transaction = total_amount / transaction_count if transaction_count > 0 else 0

    return {
        'total_millions': total_amount,
        'total_nok': int(total_amount * 1_000_000),  # Convert millions to NOK
        'transaction_count': transaction_count,
        'average_daily': avg_transaction
    }

def extract_quarter_from_filename(filename):
    """Extract year and quarter from filename like '01-01-2019 - 30-03-2019.csv'"""
    # Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec
    if '01-01' in filename or 'january' in filename.lower():
        # Start of Q1
        year = filename.split('-')[-1].replace('.csv', '').strip()
        return int(year), 1
    elif '01-04' in filename or 'april' in filename.lower():
        # Start of Q2
        year = filename.split('-')[-1].replace('.csv', '').strip()
        return int(year), 2
    elif '01-07' in filename or 'july' in filename.lower():
        # Start of Q3
        year = filename.split('-')[-1].replace('.csv', '').strip()
        return int(year), 3
    elif '01-10' in filename or 'october' in filename.lower():
        # Start of Q4
        year = filename.split('-')[-1].replace('.csv', '').strip()
        return int(year), 4

    return None, None

def main():
    # Path to the downloaded CSV files
    downloads_path = Path("/Users/gabrielboen/Downloads/Quarterly  Reports Bank Transaction 2019-2025")

    # Get all CSV files
    csv_files = list(downloads_path.glob("*.csv"))

    print(f"Found {len(csv_files)} CSV files")

    # Parse each CSV and build quarterly data
    quarterly_data = []

    for csv_file in sorted(csv_files):
        print(f"\nProcessing: {csv_file.name}")

        year, quarter = extract_quarter_from_filename(csv_file.name)

        if year is None or quarter is None:
            print(f"  ⚠️  Could not determine quarter from filename: {csv_file.name}")
            continue

        result = parse_csv_file(csv_file)

        quarterly_entry = {
            "year": year,
            "quarter": quarter,
            "quarterLabel": f"Q{quarter} {year}",
            "amount": result['total_nok'],
            "transactionCount": result['transaction_count'],
            "averageTransaction": int(result['average_daily'] * 1_000_000 / result['transaction_count']) if result['transaction_count'] > 0 else 0,
            "note": f"Total: {result['total_millions']:.2f}M NOK over {result['transaction_count']} days"
        }

        quarterly_data.append(quarterly_entry)

        print(f"  ✓ Q{quarter} {year}: {result['total_millions']:.2f}M NOK ({result['transaction_count']} days)")

    # Sort by year and quarter
    quarterly_data.sort(key=lambda x: (x['year'], x['quarter']))

    # Load the existing JSON template
    output_path = Path("/Users/gabrielboen/natural-state-place-analysis-grunerlokka-2025/src/data/quarterly/banktransaksjoner-2019-2025.json")

    with open(output_path, 'r', encoding='utf-8') as f:
        existing_data = json.load(f)

    # Update the data array
    existing_data['data'] = quarterly_data
    existing_data['metadata']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')

    # Save the updated JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Successfully converted {len(quarterly_data)} quarters")
    print(f"📁 Saved to: {output_path}")
    print(f"\n📊 Summary:")
    print(f"   Years covered: {min(q['year'] for q in quarterly_data)} - {max(q['year'] for q in quarterly_data)}")
    print(f"   Total quarters: {len(quarterly_data)}")
    print(f"   Total amount: {sum(q['amount'] for q in quarterly_data) / 1_000_000_000:.2f}B NOK")

if __name__ == "__main__":
    main()
