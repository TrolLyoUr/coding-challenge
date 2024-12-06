# Financial Metrics Calculator

## Overview

A TypeScript application that calculates and displays key financial metrics from accounting data. The application reads financial records from a JSON file and computes various accounting metrics including revenue, expenses, profit margins, and working capital ratio.

## Features

- Reads and parses financial data from JSON files
- Calculates 5 key financial metrics:
  - Revenue
  - Expenses
  - Gross Profit Margin
  - Net Profit Margin
  - Working Capital Ratio
- Provides formatted output with proper currency and percentage formatting
- Includes comprehensive test coverage
- Written in TypeScript with strict type checking

## Prerequisites

- Node.js (v18.x or v20.x)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-metrics-calculator
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Ensure your financial data is in the correct JSON format (see Data Format section)
2. Run the application:
```bash
npm start
```

Example output:
```
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 22.5%
Net Profit Margin: -12.6%
Working Capital Ratio: 187.3%
```

## Development

### Building the Project
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Type Checking
```bash
npx tsc --noEmit
```

## Data Format

The application expects a JSON file (`data.json`) with the following structure:

```json
{
  "data": [
    {
      "account_category": string,
      "account_type": string,
      "value_type": string,
      "total_value": number,
      // ... other optional fields
    }
  ]
}
```

## Testing

The project includes comprehensive test coverage for:
- Financial calculations
- Currency and percentage formatting
- Edge cases and error conditions
- Data validation

Run the test suite:
```bash
npm test
```

## CI/CD

The project includes GitHub Actions workflows for:
- Automated testing
- Type checking
- Build verification
- Artifact generation

Supported Node.js versions:
- 18.x
- 20.x

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
```
