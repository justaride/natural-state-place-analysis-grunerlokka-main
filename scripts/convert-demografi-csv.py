#!/usr/bin/env python3
"""
Convert demographic CSV files (2017-2023) to JSON format for Next.js integration
"""

import csv
import json
import os
from pathlib import Path

SOURCE_DIR = Path("/Users/gabrielboen/Downloads/Demografi 2017-2023")
OUTPUT_DIR = Path("/Users/gabrielboen/natural-state-place-analysis-grunerlokka-main/src/data/demografi")

def read_csv(filepath):
    """Read CSV file and return data as list of dicts"""
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        return list(reader)

def convert_age_distribution():
    """Convert age distribution files (2017-2023)"""
    age_data = []

    for year in range(2017, 2024):
        filepath = SOURCE_DIR / f"Aldersfordeling {year}.csv"
        data = read_csv(filepath)

        age_groups = []
        for row in data:
            age_groups.append({
                "ageGroup": row["Category"],
                "male": int(row["Mann (Thorvald Meyers gate 40B (Område 1.14 km²))"]),
                "female": int(row["Kvinne (Thorvald Meyers gate 40B (Område 1.14 km²))"])
            })

        age_data.append({
            "year": year,
            "ageGroups": age_groups
        })

    return age_data

def convert_household_types():
    """Convert household type files (2017-2023)"""
    household_data = []

    for year in range(2017, 2024):
        filepath = SOURCE_DIR / f"Antall husholdninger {year}.csv"
        data = read_csv(filepath)

        households = []
        for row in data:
            households.append({
                "type": row["Category"],
                "count": int(row["Thorvald Meyers gate 40B (Område 1.14 km²)"])
            })

        household_data.append({
            "year": year,
            "households": households
        })

    return household_data

def convert_income_distribution():
    """Convert income distribution files (2017-2023)"""
    income_data = []

    for year in range(2017, 2024):
        filepath = SOURCE_DIR / f"Inntektsfordeling {year}.csv"
        data = read_csv(filepath)

        income_brackets = []
        for row in data:
            income_brackets.append({
                "bracket": row["Category"],
                "count": float(row["Thorvald Meyers gate 40B (Område 1.14 km²)"])
            })

        income_data.append({
            "year": year,
            "incomeBrackets": income_brackets
        })

    return income_data

def convert_building_types():
    """Convert building type files (2017-2023)"""
    building_data = []

    for year in range(2017, 2024):
        filepath = SOURCE_DIR / f"Antall hus {year}.csv"
        data = read_csv(filepath)

        buildings = []
        for row in data:
            buildings.append({
                "type": row["Category"],
                "count": int(row["Thorvald Meyers gate 40B (Område 1.14 km²)"])
            })

        building_data.append({
            "year": year,
            "buildings": buildings
        })

    return building_data

def convert_population_over_time():
    """Convert population over time summary"""
    filepath = SOURCE_DIR / "Demografi over tid.csv"
    data = read_csv(filepath)

    population_data = []
    for row in data:
        population_data.append({
            "year": int(row["Category"]),
            "population": int(row["Thorvald Meyers gate 40B (Område 1.14 km²)"]),
            "trendline": float(row["Trendline"])
        })

    return population_data

def convert_median_income_by_household():
    """Convert median income by household type (2015-2022)"""
    median_income_data = []

    # Note: Data available from 2015-2022
    for year in range(2015, 2023):
        filepath = SOURCE_DIR / f"Medianinntekt per husholdningstype {year}.csv"
        if not filepath.exists():
            continue

        data = read_csv(filepath)

        median_incomes = []
        for row in data:
            median_incomes.append({
                "householdType": row["Category"],
                "medianIncome": float(row["Thorvald Meyers gate 40B (Område 1.14 km²)"])
            })

        median_income_data.append({
            "year": year,
            "medianIncomes": median_incomes
        })

    return median_income_data

def main():
    """Main conversion function"""
    print("Converting demographic CSV files to JSON...")

    # Create output directory if it doesn't exist
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Convert all data types
    print("Converting age distribution...")
    age_data = convert_age_distribution()

    print("Converting household types...")
    household_data = convert_household_types()

    print("Converting income distribution...")
    income_data = convert_income_distribution()

    print("Converting building types...")
    building_data = convert_building_types()

    print("Converting population over time...")
    population_data = convert_population_over_time()

    print("Converting median income by household type...")
    median_income_data = convert_median_income_by_household()

    # Create consolidated output
    output = {
        "metadata": {
            "title": "Demografi 2017-2023",
            "area": "Thorvald Meyers gate 40B",
            "areaSize": "1.14 km²",
            "timeRange": "2017-2023",
            "source": "Plaace.ai / SSB",
            "generatedAt": "2025-11-18"
        },
        "populationOverTime": population_data,
        "ageDistribution": age_data,
        "householdTypes": household_data,
        "incomeDistribution": income_data,
        "buildingTypes": building_data,
        "medianIncomeByHousehold": median_income_data
    }

    # Write to JSON file
    output_file = OUTPUT_DIR / "demografi-2017-2023.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Conversion complete! Output saved to: {output_file}")
    print(f"\nData summary:")
    print(f"  - Population data: {len(population_data)} years (2017-2023)")
    print(f"  - Age distribution: {len(age_data)} years")
    print(f"  - Household types: {len(household_data)} years")
    print(f"  - Income distribution: {len(income_data)} years")
    print(f"  - Building types: {len(building_data)} years")
    print(f"  - Median income by household: {len(median_income_data)} years (2015-2022)")

if __name__ == "__main__":
    main()
