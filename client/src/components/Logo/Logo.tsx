import React, { FC } from 'react';
import './Logo.scss';

const Logo: FC<{ className?: string }> = function Logo({ className }) {
	return <div className={`logo ${className}`}>Prezent Od Psa</div>;
};

export default Logo;
