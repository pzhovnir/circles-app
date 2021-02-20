const express = require('express');
const CompanyController = require('../../controllers/CompanyController');
const { createCompanyForm } = require('../../utils/validators/company');

const router = express.Router();

router.post('/', [...createCompanyForm], CompanyController.createCompany);

router.put('/:id', [...createCompanyForm], CompanyController.updateCompany);

router.get('/', [], CompanyController.getCompanies);

router.get('/:id', [], CompanyController.getCompany);

router.delete('/:id', [], CompanyController.deleteCompany);

module.exports = router;
