import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import CategoryView from "./pages/forum/CategoryView";
import TopicView from "./pages/forum/TopicView";
import NewTopic from "./pages/forum/NewTopic";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import MCQTest from "./pages/MCQTest";
import QCM from "./pages/QCM";
import TestList from "./pages/qcm/TestList";
import FirstYearTestList from "./pages/qcm/FirstYearTestList";
import Users from "./pages/dashboard/Users";
import QCMDashboard from "./pages/dashboard/QCMDashboard";
import Account from "./pages/dashboard/Account";
import Courses from "./pages/dashboard/Courses";
import Settings from "./pages/dashboard/Settings";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="users/*" element={<Users />} />
              <Route path="qcm/*" element={<QCMDashboard />} />
              <Route path="courses/*" element={<Courses />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Route>
          <Route path="/forum">
            <Route index element={<Forum />} />
            <Route path="category/:categoryId" element={<CategoryView />} />
            <Route path="topic/:topicId" element={<TopicView />} />
            <Route path="new-topic" element={<NewTopic />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/mcq-test" element={<MCQTest />} />
          <Route path="/qcm" element={<QCM />} />
          <Route path="/qcm/test-list" element={<TestList />} />
          <Route path="/qcm/test-list1" element={<FirstYearTestList />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;