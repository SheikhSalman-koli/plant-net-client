import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
import CutomerStatistic from '../Customer/CutomerStatistic'
import SellerStatistic from '../Seller/SellerStatistic'
const Statistics = () => {

  const [role, isRoleLoading] = useRole()

  if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      {role === 'admin' && <AdminStatistics />}
      {role === 'sller' && <SellerStatistic></SellerStatistic>}
      {role === 'customer' && <CutomerStatistic></CutomerStatistic>}
    </div>
  )
}

export default Statistics
