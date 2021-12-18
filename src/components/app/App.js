import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { lazy, Suspense } from "react";
const Page404 = lazy(() => import('../pages/404'));
const ComicsPages = lazy(() => import('../pages/ComicsPages'));
const MainPages = lazy(() => import('../pages/MainPages'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<span>loading</span>}>
                        <Routes>
                            <Route exact path="/" element={<MainPages/>}/>                        
                            <Route exact path="/comics" element={<ComicsPages/>}/>  
                            <Route exact path="/comics/:comicId" element={<SingleComicPage/>}/>   {/* любое что придумаем например comicId */}                       
                            <Route path='*' element={<Page404/>}> </Route>                      
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;