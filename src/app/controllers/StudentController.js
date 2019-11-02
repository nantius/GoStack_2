import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      weight: Yup.number().required(),
      age: Yup.number()
        .integer()
        .required(),
      height: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Email validation
    const studentExists = await Student.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      res.status(400).json({ error: 'Email already in use' });
    }

    const { id, name, age, height, weight, email } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      age,
      height,
      email,
      weight
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      weight: Yup.number(),
      age: Yup.number().integer(),
      height: Yup.float()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const email_req = req.body.email;
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    // Checking for existing email
    if (email_req && email_req !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: email_req }
      });
      if (studentExists) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    const { id, name, email, weight, height, age } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      weight,
      height,
      age
    });
  }
}

export default new StudentController();
