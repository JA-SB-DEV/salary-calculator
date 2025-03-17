import Teacher from '../models/teacher';

const TEACHERS_KEY = 'teachers';

export const addTeacher = (teacher: Teacher) => {
    const teachers = getTeachers();
    teachers.push(teacher);
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
};

export const getTeachers = (): Teacher[] => {
    const teachers = localStorage.getItem(TEACHERS_KEY);
    return teachers ? JSON.parse(teachers) : [];
};

export const deleteTeacher = (id: string) => {
    let teachers = getTeachers();
    teachers = teachers.filter(teacher => teacher.id !== id);
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
};
