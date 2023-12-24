import { useState, useEffect } from 'react';
import { type LanguageType } from '../../types';
import FetchRequest from '@/app/provider/api';
import { useRouter } from 'next/navigation';

export const SelectLanguage = () => {
	return (
		<div>
			<p className="text-3xl max-sm:text-center font-light my-8 max-md-text-center">
				Selecione a língua
			</p>
			<div className="flex justify-center linguas">
				{langs.map(({ lingua }, id) => (
					<span
						className={unselectedStyle}
						key={id}
						onClick={() => {
							selectLanguage(id);
							console.log(selectLanguage);
						}}
					>
						{lingua}
					</span>
				))}
			</div>
		</div>
	);
};
