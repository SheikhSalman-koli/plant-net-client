const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>title:{title}</div>
      <div className='font-light text-neutral-500 mt-2'>Name:{subtitle}</div>
    </div>
  )
}

export default Heading
