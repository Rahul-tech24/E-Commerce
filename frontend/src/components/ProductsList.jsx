import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	if (!products || products.length === 0) {
		return (
			<motion.div
				className='bg-gray-800 shadow-lg rounded-lg p-8 text-center max-w-4xl mx-auto'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<p className='text-gray-400 text-lg'>No products found. Create your first product!</p>
			</motion.div>
		);
	}

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			{/* Desktop Table View */}
			<div className='hidden md:block'>
				<div className='overflow-x-auto max-h-96 overflow-y-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700 sticky top-0'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Category
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4'>
								<div className='flex items-center'>
									<div className='shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4 min-w-0 flex-1'>
										<div className='text-sm font-medium text-white truncate max-w-xs' title={product.name}>
											{product.name}
										</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4'>
								<div className='text-sm text-gray-300 capitalize'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
				</div>
			</div>

			{/* Mobile Card View */}
			<div className='md:hidden max-h-96 overflow-y-auto p-4 space-y-4'>
				{products?.map((product) => (
					<div key={product._id} className='bg-gray-700 rounded-lg p-4 space-y-3'>
						<div className='flex items-center space-x-3'>
							<img
								className='h-12 w-12 rounded-lg object-cover'
								src={product.image}
								alt={product.name}
							/>
							<div className='flex-1 min-w-0'>
								<h3 className='text-white font-medium truncate'>{product.name}</h3>
								<p className='text-gray-300 text-sm'>{product.category}</p>
							</div>
							<div className='text-right'>
								<p className='text-white font-semibold'>${product.price.toFixed(2)}</p>
							</div>
						</div>
						<div className='flex items-center justify-between'>
							<button
								onClick={() => toggleFeaturedProduct(product._id)}
								className={`p-2 rounded-full ${
									product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
								} hover:bg-yellow-500 transition-colors duration-200`}
							>
								<Star className='h-4 w-4' />
							</button>
							<button
								onClick={() => deleteProduct(product._id)}
								className='p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200'
							>
								<Trash className='h-4 w-4' />
							</button>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
};
export default ProductsList;
