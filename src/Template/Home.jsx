import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '../components/UIKit';

const Home = () => {
	const history = useHistory();

    return (
		<div className="container mx-auto px-8">
			<h1 className="text-4xl font-bold text-center">container</h1>
			<div className="text-center px-4 py-2 m-2">
				<Button
					label="文字起こしツール"
					onClick={() => history.push('/recognition')}
				/>
			</div>
			<div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">2</div>
			<div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">3</div>

		</div>
    )
};

export default Home;