
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import Course from "./pages/Course";
import Blog from "./pages/Blog";
import Forum from "./pages/Forum";
import CategoryView from "./pages/forum/CategoryView";
import TopicView from "./pages/forum/TopicView";
import QCM from "./pages/QCM";
import TestList from "./pages/qcm/TestList";
import FirstYearTestList from "./pages/qcm/FirstYearTestList";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/dashboard/Users";
import Courses from "./pages/dashboard/Courses";
import Account from "./pages/dashboard/Account";
import Settings from "./pages/dashboard/Settings";
import QCMDashboard from "./pages/dashboard/QCMDashboard";
import ExamView from "./pages/dashboard/qcm/ExamView";
import QCMCategories from "./pages/dashboard/qcm/QCMCategories";
import BlogPost from "./pages/BlogPost";
import QCMYearList from "./pages/dashboard/qcm/QCMYearList";
import QCMSubjects from "./pages/dashboard/qcm/QCMSubjects";
import Subjects from "./pages/qcm/Subjects";
import BlogManagement from "./pages/dashboard/BlogManagement";
import MCQTest from "./pages/MCQTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/categories" element={<CategoryView />} />
          <Route path="/forum/category/:categoryName" element={<Forum />} />
          <Route path="/forum/topic/:topicId" element={<TopicView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="courses" element={<Courses />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="qcm" element={<QCMDashboard />} />
            <Route path="qcm/exam/:id" element={<ExamView />} />
            <Route path="qcm/categories" element={<QCMCategories />} />
            <Route path="qcm/lawyers/:year" element={<QCMYearList />} />
            <Route path="qcm/subjects" element={<QCMSubjects />} />
          </Route>
          <Route path="/qcm" element={<QCM />} />
          <Route path="/qcm/test-list" element={<TestList category="lawyer" />} />
          <Route path="/qcm/test-list1" element={<FirstYearTestList />} />
          <Route path="/qcm/subjects" element={<Subjects />} />
          <Route path="/mcq-test" element={<MCQTest />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
