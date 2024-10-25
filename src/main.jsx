import { createRoot } from 'react-Dom/client';
import RecetteDuJour from './recettes';

const recette = <RecetteDuJour/>;
const rootRecette= createRoot(document.querySelector('#root') ?? document.body);
rootRecette.render(recette);



