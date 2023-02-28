import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Course,
  fetchCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from "../api/courses";
import CourseForm from "./courses-form";

const CourseTable: React.FC = () => {
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [isEditCourseModalVisible, setIsEditCourseModalVisible] =
    useState(false);
  const [courseIdToEdit, setCourseIdToEdit] = useState<string>("");
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data: courses, isLoading: isCoursesLoading } = useQuery(
    "course",
    fetchCourses,
    {
      refetchOnMount: false,
    }
  );

  const { mutate: addCourseMutation } = useMutation(
    (course: Course) => addCourse(course),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("course");
      },
    }
  );

  const { mutate: updateCourseMutation } = useMutation(
    (studentValues: Course) => updateCourse(studentValues),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("course");
      },
    }
  );

  const { mutate: deleteCourseMutation } = useMutation(
    (courseId: string) => deleteCourse(courseId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("course");
      },
    }
  );

  const handleAddCourseOk = () => {
    form.validateFields().then((values) => {
      addCourseMutation(values);
      setIsAddCourseModalVisible(false);
      form.resetFields();
    });
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      values.id = courseIdToEdit;
      updateCourseMutation(values);
      form.resetFields();
    });
    setIsEditCourseModalVisible(false);
  };

  const handleDelete = (record: Course) => {
    Modal.confirm({
      title: "Delete Course",
      content: `Are you sure you want to delete ${record.title}?`,
      onOk: () => {
        deleteCourseMutation(record.id as string);
      },
      onCancel: () => {},
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Workload",
      dataIndex: "workload",
      key: "workload",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, course: Course) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue(course);
              setCourseIdToEdit(course.id as string);
              setIsEditCourseModalVisible(true);
            }}
          />
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(course)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button
          type="primary"
          onClick={() => setIsAddCourseModalVisible(true)}
          icon={<PlusOutlined />}
        >
          Add Course
        </Button>
      </div>
      <Table
        dataSource={courses}
        columns={columns}
        loading={isCoursesLoading}
        rowKey="id"
      />
      <Modal
        title="Add Course"
        open={isAddCourseModalVisible}
        onOk={handleAddCourseOk}
        onCancel={() => setIsAddCourseModalVisible(false)}
      >
        <CourseForm form={form} />
      </Modal>
      <Modal
        title="Edit Course"
        open={isEditCourseModalVisible}
        onOk={handleEditOk}
        onCancel={() => setIsEditCourseModalVisible(false)}
      >
        <CourseForm form={form} />
      </Modal>
    </>
  );
};

export default CourseTable;
