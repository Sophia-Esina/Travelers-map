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
					modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
					properties={{
						balloonContentHeader: dream.title,
						balloonContentBody: `
						  <div>
							${dream.country}<br/>
							<img src="${dream.imageUrl}" width="100"/><br/>
							<a href="/dream/${dream.id}">Подробнее...</a>
						  </div>
						`,
					}}
					options={{
						balloonPanelMaxMapArea: 0,
						hasBalloon: true,
						openBalloonOnClick: true,
						iconColor: '#ff671e',
					}}
				/>
			))}
		</div>
	);
};
