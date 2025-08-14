import LineChartOne from '../../../components/components/charts/line/LineChartOne';
import ComponentCard from '../../../components/components/common/ComponentCard';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';

export default function LineChart() {
    return (
        <>
            <PageBreadcrumb pageTitle="Line Chart" />
            <div className="space-y-6">
                <ComponentCard title="Line Chart 1">
                    <LineChartOne />
                </ComponentCard>
            </div>
        </>
    );
}
