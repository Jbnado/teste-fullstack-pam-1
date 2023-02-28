import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Student,
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../api/students";
import StudentForm from "./students-form";
import { fetchCourse } from "../api/courses";

const StudentTable: React.FC = () => {
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] =
    useState(false);
  const [isEditStudentModalVisible, setIsEditStudentModalVisible] =
    useState(false);
  const [studentIdToEdit, setStudentIdToEdit] = useState<string>("");
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data: students, isLoading: isStudentsLoading } = useQuery(
    "students",
    fetchStudents,
    {
      refetchOnMount: false,
    }
  );

  const { mutate: addStudentMutation } = useMutation(
    (student: Student) => addStudent(student),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
      },
    }
  );

  const { mutate: updateStudentMutation } = useMutation(
    (studentValues: Student) => updateStudent(studentValues),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
      },
    }
  );

  const { mutate: deleteStudentMutation } = useMutation(
    (studentId: string) => deleteStudent(studentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
      },
    }
  );

  const handleAddStudentOk = () => {
    form.validateFields().then((values) => {
      addStudentMutation(values);
      setIsAddStudentModalVisible(false);
      form.resetFields();
    });
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      values.id = studentIdToEdit;
      updateStudentMutation(values);
      form.resetFields();
    });
    setIsEditStudentModalVisible(false);
  };

  const handleEditCancel = () => {
    form.resetFields();
    setIsEditStudentModalVisible(false);
  };

  const handleDelete = (record: Student) => {
    Modal.confirm({
      title: "Delete Student",
      content: `Are you sure you want to delete ${record.name}?`,
      onOk: () => {
        deleteStudentMutation(record.id as string);
      },
      onCancel: () => {},
    });
  };

  const Course = ({ id }: { id: string }) => {
    const { data, isLoading } = useQuery(["course", id], () => fetchCourse(id));
    const returnString = isLoading
      ? "Fetching Course"
      : data?.title ?? "Course not found";
    return <span>{returnString}</span>;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: string) => <Course id={course} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, student: Student) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue(student);
              setStudentIdToEdit(student.id as string);
              setIsEditStudentModalVisible(true);
            }}
          />
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(student)}
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
          onClick={() => setIsAddStudentModalVisible(true)}
          icon={<PlusOutlined />}
        >
          Add Student
        </Button>
      </div>
      <Table
        dataSource={students}
        columns={columns}
        loading={isStudentsLoading}
        rowKey="id"
      />
      <Modal
        title="Add Student"
        open={isAddStudentModalVisible}
        onOk={handleAddStudentOk}
        onCancel={() => setIsAddStudentModalVisible(false)}
      >
        <StudentForm form={form} />
      </Modal>
      <Modal
        title="Edit Student"
        open={isEditStudentModalVisible}
        onOk={handleEditOk}
        onCancel={() => handleEditCancel()}
      >
        <StudentForm form={form} />
      </Modal>
    </>
  );
};

export default StudentTable;
