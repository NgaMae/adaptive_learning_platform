import ComponentCard from '../../../components/components/common/ComponentCard';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';
import BasicTableOne from '../../../components/components/tables/BasicTables/BasicTableOne';

export default function BasicTables() {
    return (
        <>
            <PageBreadcrumb pageTitle="Basic Tables" />
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">
                    <BasicTableOne />
                </ComponentCard>
            </div>
        </>
    );
}
