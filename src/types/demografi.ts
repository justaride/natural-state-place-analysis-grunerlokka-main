/**
 * Type definitions for demographic data (2017-2023)
 */

export interface DemografiMetadata {
  title: string;
  area: string;
  areaSize: string;
  timeRange: string;
  source: string;
  generatedAt: string;
}

export interface PopulationDataPoint {
  year: number;
  population: number;
  trendline: number;
}

export interface AgeGroup {
  ageGroup: string;
  male: number;
  female: number;
}

export interface AgeDistributionYear {
  year: number;
  ageGroups: AgeGroup[];
}

export interface Household {
  type: string;
  count: number;
}

export interface HouseholdTypeYear {
  year: number;
  households: Household[];
}

export interface IncomeBracket {
  bracket: string;
  count: number;
}

export interface IncomeDistributionYear {
  year: number;
  incomeBrackets: IncomeBracket[];
}

export interface Building {
  type: string;
  count: number;
}

export interface BuildingTypeYear {
  year: number;
  buildings: Building[];
}

export interface MedianIncome {
  householdType: string;
  medianIncome: number;
}

export interface MedianIncomeYear {
  year: number;
  medianIncomes: MedianIncome[];
}

export interface DemografiData {
  metadata: DemografiMetadata;
  populationOverTime: PopulationDataPoint[];
  ageDistribution: AgeDistributionYear[];
  householdTypes: HouseholdTypeYear[];
  incomeDistribution: IncomeDistributionYear[];
  buildingTypes: BuildingTypeYear[];
  medianIncomeByHousehold: MedianIncomeYear[];
}
