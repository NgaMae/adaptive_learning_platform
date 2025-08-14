import ComponentCard from '../../../components/components/common/ComponentCard';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';
import ResponsiveImage from '../../../components/components/ui/images/ResponsiveImage';
import ThreeColumnImageGrid from '../../../components/components/ui/images/ThreeColumnImageGrid';
import TwoColumnImageGrid from '../../../components/components/ui/images/TwoColumnImageGrid';

export default function Images() {
    return (
        <>
            <PageBreadcrumb pageTitle="Images" />
            <div className="space-y-5 sm:space-y-6">
                <ComponentCard title="Responsive image">
                    <ResponsiveImage />
                </ComponentCard>
                <ComponentCard title="Image in 2 Grid">
                    <TwoColumnImageGrid />
                </ComponentCard>
                <ComponentCard title="Image in 3 Grid">
                    <ThreeColumnImageGrid />
                </ComponentCard>
            </div>
        </>
    );
}
