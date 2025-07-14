import { useEffect, useState } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { request } from '../../../../utils';

export const DreamsPlacemark = () => {
	const [dreams, setDreams] = useState([]);

	useEffect(() => {
		request('/dream').then(({ data }) => {
			setDreams(data?.dreams || []);
		});
	}, []);

	return (
		<div>
			{dreams.map((dream) => (
				<Placemark
					key={dream.id}
					geometry={dream.coordinates
						.split(',')
						.map((coord) => parseFloat(coord.trim()))}
					properties={{
						balloonContent: `
						<div>
							<strong>${dream.title}</strong><br/>
							${dream.country}<br/>
							<img src="${dream.imageUrl}" width="100"/><br/>
							${new Date(dream.date).toLocaleDateString()}<br/>
							<a href="/dream/${dream.id}">Подробнее...</a>
						  </div>
						  `,
					}}
					options={{
						iconColor: '#ff671e',
						balloonPanelMaxMapArea: 0,
					}}
				/>
			))}
		</div>
	);
};
