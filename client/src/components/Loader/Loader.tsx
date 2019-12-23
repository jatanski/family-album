import React, { FC } from 'react';

interface Props {
	color?: string;
	size?: number;
	className?: string;
}

const Loader: FC<Props> = function Loader({ color = '#1d3f72', size = 1, className }) {
	return (
		<svg
			style={{
				margin: 'auto',
				background: 'none',
				display: 'inline-block',
				shapeRendering: 'auto',
			}}
			width={`${30 * size}px`}
			height={`${30 * size}px`}
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			className={className}
		>
			<path
				fill="none"
				stroke={color}
				strokeWidth="5"
				strokeDasharray="189.87580688476564 66.71312133789061"
				d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
				strokeLinecap="round"
				style={{ transform: 'scale(0.79)', transformOrigin: '50px 50px' }}
			>
				<animate
					attributeName="stroke-dashoffset"
					repeatCount="indefinite"
					dur="1.075268817204301s"
					keyTimes="0;1"
					values="0;256.58892822265625"
				></animate>
			</path>
		</svg>
	);
};

export { Loader as default };
