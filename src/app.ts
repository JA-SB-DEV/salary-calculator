import Teacher from "./models/teacher";
import { calculateSalary } from "./services/salaryCalculator";

const main = () => {
  const teachers: Teacher[] = [];
  teachers.forEach((teacher) => {
    const totalSalary = calculateSalary(teacher);
    console.log(`El salario total de ${teacher.nombre} es: ${totalSalary}`);
  });
};

main();
