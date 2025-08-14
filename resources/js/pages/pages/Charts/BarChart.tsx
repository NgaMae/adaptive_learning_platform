import BarChartOne from '../../../components/components/charts/bar/BarChartOne';
import ComponentCard from '../../../components/components/common/ComponentCard';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';

export default function BarChart() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Bar Chart" />
            <div className="space-y-6">
                <ComponentCard title="Bar Chart 1">
                    <BarChartOne />
                </ComponentCard>
            </div>
        </div>
    );
}
