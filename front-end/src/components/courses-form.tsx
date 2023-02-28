import { Form, FormInstance, Input } from "antd";

const CourseForm: React.FC<{
  form: FormInstance<any>;
}> = ({ form }) => {
  return (
    <Form form={form}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the course title." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Teacher"
        name="teacher"
        rules={[
          { required: true, message: "Please input the course teacher." },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Workload"
        name="workload"
        rules={[
          { required: true, message: "Please input the course workload." },
        ]}
      >
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
