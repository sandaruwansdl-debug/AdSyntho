# Ad Syntho Dashboard

An AI-powered dashboard for unified paid campaign management and insights.

## Features

- **Unified Dashboard**: Connect multiple ad platform accounts in one place
- **AI-Powered Insights**: Get actionable recommendations for campaign optimization
- **Real-time Analytics**: Monitor performance across all platforms
- **Smart Automation**: Automate routine tasks and focus on strategy
- **Cross-Platform Reporting**: Compare performance and identify opportunities

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ad-syntho-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── dashboard/         # Dashboard page
│   ├── connect-accounts/  # Account connection page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── AIInsights.tsx     # AI insights component
│   ├── CampaignPerformance.tsx # Campaign performance charts
│   └── DashboardLayout.tsx # Dashboard layout wrapper
├── pages/                 # Page components
│   ├── index.tsx          # Landing page
│   ├── dashboard.tsx      # Main dashboard
│   └── connect-accounts.tsx # Account connection
├── styles/                # Global styles
│   └── globals.css        # Tailwind CSS imports
└── types/                 # TypeScript type definitions
```

## Pages

### Landing Page (`/`)
- Business overview and value proposition
- Feature highlights
- Call-to-action for trial signup

### Dashboard (`/dashboard`)
- Campaign performance overview
- KPI metrics
- Performance charts and trends
- AI insights and recommendations

### Connect Accounts (`/connect-accounts`)
- Platform connection management
- Account status overview
- Connection benefits explanation

## Components

### AIInsights
- Displays AI-generated recommendations
- Categorizes insights by type and impact
- Provides actionable next steps

### CampaignPerformance
- Performance metrics and KPIs
- Interactive charts and graphs
- Campaign comparison tables

### DashboardLayout
- Responsive sidebar navigation
- Header with user controls
- Mobile-friendly design

## Customization

### Styling
The project uses Tailwind CSS with custom color schemes. Modify `tailwind.config.js` to change:
- Primary colors
- Font families
- Component spacing

### Data Sources
Currently uses mock data. To connect real data sources:
1. Update API endpoints in components
2. Modify data structures to match your API
3. Implement authentication and authorization

### AI Integration
To integrate with real AI services:
1. Replace mock insights with API calls
2. Implement AI model endpoints
3. Add real-time data processing

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for environment-specific configuration:
```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_AI_SERVICE_KEY=your-ai-service-key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the development team.
