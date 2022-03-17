"use strict";

const express =require ('express');
const router = express.Router();
const {Users,profiles}=require('../models/index');
const bearerAuth=require("../middleware/bearer.middleware");
const acl =require('../middleware/acl.middleware');

router.post("/profile", bearerAuth(Users), acl("create"), createNewprofile);
router.get("/profile", bearerAuth(Users), acl("read"), readprofileHandler);
router.get("/profile/:id", bearerAuth(Users), acl("read"), readAspecificprofile);
router.put("/profile/:id", bearerAuth(Users), acl("update"), updateprofile);
router.delete("/profile/:id", bearerAuth(Users), acl("delete"), deleteprofile);


async function readprofileHandler(req, res) {
    let profile = await profiles.findAll();
    res.status(200).json(profile);
  }
  
  async function createNewprofile(req, res) {
    let newProfile = req.body;
    let profile = await profiles.create(newProfile);
    res.status(201).json(profile);
  }
  
  async function updateprofile(req, res) {
    const id = parseInt(req.params.id);
    let updatedOne = req.body;
    let updatedProfile = await profiles.findOne({ where: { id: id } });
    let updateprofile = await updatedProfile.update(updatedOne);
    res.status(201).json(updateprofile);
  }
  
  async function deleteprofile(req, res) {
    const id = parseInt(req.params.id);
    let deleteProfile = await profiles.destroy({ where: { id } });
    res.status(204).json(deleteProfile);
  }
  
  async function readAspecificprofile(req, res) {
    const id = parseInt(req.params.id);
    const profileID = await profiles.findOne({ where: { id: id } });
    res.status(200).json(profileID);
  }







module.exports =router;