import { useEffect, useState } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { request } from '../../../../utils';

export const TravelsPlacemark = () => {
	const [travels, setTravels] = useState([]);

	useEffect(() => {
		request('/travel').then(({ data }) => {
			setTravels(data?.travels || []);
		});
	}, []);

	return (
		<div>
			{travels.map((travel) => (
				<Placemark
					key={travel.id}
					geometry={travel.coordinates
						.split(',')
						.map((coord) => parseFloat(coord.trim()))}
					modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
					properties={{
						balloonContentHeader: travel.title,
						balloonContentBody: `
      						<div>
        						${travel.country}<br/>
        						<img src="${travel.imageUrl}" width="100"/><br/>
        						<a href="/travel/${travel.id}">Подробнее...</a>
      						</div>
    						`,
					}}
					options={{
						balloonPanelMaxMapArea: 0,
						hasBalloon: true,
						openBalloonOnClick: true,
					}}
				/>
			))}
		</div>
	);
};
