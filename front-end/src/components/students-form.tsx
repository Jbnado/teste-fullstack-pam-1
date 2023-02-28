import { useQuery } from "react-query";
import { Form, FormInstance, Input, Select } from "antd";
import { fetchCourses } from "../api/courses";

const StudentForm: React.FC<{
  form: FormInstance<any>;
}> = ({ form }) => {
  const { data: courses } = useQuery("courses", fetchCourses);

  return (
    <Form form={form}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the student name." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input the student email." },
          { type: "email", message: "Please enter a valid email." },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Course"
        name="course"
        rules={[
          { required: true, message: "Please select the student course." },
        ]}
      >
        <Select
          options={courses?.map((course) => ({
            label: course.title,
            value: course.id,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default StudentForm;
