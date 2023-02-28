import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Card } from "antd";
import StudentTable from "./components/student-table";
import CourseTable from "./components/course-table";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("students");

  const tabList = [
    {
      key: "students",
      tab: "Students",
    },
    {
      key: "courses",
      tab: "Courses",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    students: <StudentTable />,
    courses: <CourseTable />,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "24px" }}>
        <h1>Students Registration</h1>
        <Card
          style={{ width: "100%" }}
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={setActiveTab}
        >
          {contentList[activeTab]}
        </Card>
      </div>
    </QueryClientProvider>
  );
};

export default App;
