import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    console.log(req.body);
    const { name, subject, type, value } = req.body;
    const grade = { name, subject, type, value };
    const result = await db.create(grade);
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const info = await db.find(condition);
    res.send(info);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await db.find({ _id: id });
  res.send(result[0]);

  try {
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const _id = req.params.id;
  const { name, subject, type, value } = req.body;
  const dados = {
    _id,
    name,
    subject,
    type,
    value,
  };

  const result = await db.findByIdAndUpdate({ _id: dados._id }, dados, {
    new: true,
  });

  res.send(result);
  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  db.findOneAndDelete({ _id: id }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  res.send('Grade Excluída com sucesso');
  try {
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  db.deleteMany({}, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  res.send();
  try {
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
