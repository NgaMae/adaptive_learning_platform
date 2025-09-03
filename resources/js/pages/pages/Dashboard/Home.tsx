import RecentOrders from '@/components/components/ecommerce/RecentOrders';
import EcommerceMetrics from '../../../components/components/ecommerce/EcommerceMetrics';

export default function Home() {
    return (
        <>
            <div className="grid h-screen gap-4 md:gap-6">
                <div className="space-y-6">
                    <EcommerceMetrics />
                </div>

                <div className="">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
}
