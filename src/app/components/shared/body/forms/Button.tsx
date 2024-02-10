import { type IButton } from '@/app/components/types';

import Image from 'next/image';

export const Button = ({
	style,
	text,
	textColor = 'text-white',
	imageSide,
	image,
	backgroundColor = 'bg-primaryBlue',
	id,
	onClick,
	isActive = true,
	hoverColor = 'hover:bg-secondaryBlue',
}: IButton) => {
	return (
		<button
			onClick={onClick}
			className={` ${style} ${isActive && 'hover:cursor-pointer'} ${
				!isActive && 'opacity-50'
			}  `}
		>
			<section className="flex">
				<div
					className={`${textColor} flex justify-center  font-semibold w-full text-[14px] ${backgroundColor} rounded-[14px] px-[32px] py-[14px] ${
						isActive && hoverColor
					}`}
				>
					{image && imageSide === 'left' && (
						<Image
							alt="Logo"
							className="mr-3"
							width={14}
							height={14}
							src={image}
						/>
					)}
					{text}
					{image && imageSide === 'right' && (
						<Image
							alt="Logo"
							className="ml-3"
							width={14}
							height={14}
							src={image}
						/>
					)}
				</div>
			</section>
		</button>
	);
};
