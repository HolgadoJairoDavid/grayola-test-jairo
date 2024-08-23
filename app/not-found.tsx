import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center  grow'>
      <h2 className='md:text-4xl text-2xl font-bold'>Not Found</h2>
      <p className='text-neutral-500'>Could not find requested resource</p>
      <Link href="/" className='font-bold underline'>Return Home</Link>
    </div>
  )
}