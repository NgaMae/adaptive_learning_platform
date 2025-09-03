import { usePage } from '@inertiajs/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { ScrollToTop } from '../components/components/common/ScrollToTop';
import AppLayout from '../layouts/layout/AppLayout';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import Blank from './pages/Blank';
import Calendar from './pages/Calendar';
import BarChart from './pages/Charts/BarChart';
import LineChart from './pages/Charts/LineChart';
import Home from './pages/Dashboard/Home';
import Courses from './pages/Education/Courses';
import Lessons from './pages/Education/Lessons';
import Quizzes from './pages/Education/Quizzes';
import FormElements from './pages/Forms/FormElements';
import NotFound from './pages/OtherPage/NotFound';
import BasicTables from './pages/Tables/BasicTables';
import Alerts from './pages/UiElements/Alerts';
import Avatars from './pages/UiElements/Avatars';
import Badges from './pages/UiElements/Badges';
import Buttons from './pages/UiElements/Buttons';
import Images from './pages/UiElements/Images';
import Videos from './pages/UiElements/Videos';
import UserProfiles from './pages/UserProfiles';

export default function App() {
    const { auth } = (usePage().props as any) || {};
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route index path="tutor/" element={<Home />} />

                        {/* Education Pages */}
                        <Route path="tutor/courses" element={<Courses />} />
                        <Route path="tutor/lessons" element={<Lessons />} />
                        <Route path="tutor/quizzes" element={<Quizzes />} />

                        {/* Others Page */}
                        <Route path="tutor/profile" element={<UserProfiles auth={auth} />} />
                        <Route path="tutor/calendar" element={<Calendar />} />
                        <Route path="tutor/blank" element={<Blank />} />

                        {/* Forms */}
                        <Route path="tutor/form-elements" element={<FormElements />} />

                        {/* Tables */}
                        <Route path="tutor/basic-tables" element={<BasicTables />} />

                        {/* Ui Elements */}
                        <Route path="tutor/alerts" element={<Alerts />} />
                        <Route path="tutor/avatars" element={<Avatars />} />
                        <Route path="tutor/badge" element={<Badges />} />
                        <Route path="tutor/buttons" element={<Buttons />} />
                        <Route path="tutor/images" element={<Images />} />
                        <Route path="tutor/videos" element={<Videos />} />

                        {/* Charts */}
                        <Route path="tutor/line-chart" element={<LineChart />} />
                        <Route path="tutor/bar-chart" element={<BarChart />} />
                    </Route>

                    {/* Auth Layout */}
                    <Route path="tutor/signin" element={<SignIn />} />
                    <Route path="tutor/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
