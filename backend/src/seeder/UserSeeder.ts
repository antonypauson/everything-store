import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const seedUsers = async () => {
  //create a repository
  const userRepo = AppDataSource.getRepository(User);

  //one normal user
  let normalUser = await userRepo.findOne({
    where: { username: "dostoevsky" },
    select: { username: true, email: true, role: true },
  });

  if (!normalUser) {
    normalUser = userRepo.create({
      username: "dostoevsky",
      email: "dostoevsky@fyodor.com",
      password: "dostoevsky_passoword",
    });
    await userRepo.save(normalUser);
    console.log("Normal User saved", normalUser);
  } else {
    console.log("Normal User already exists", normalUser);
  }

  //one admin user
  let adminUser = await userRepo.findOne({
    where: { username: 'admin'}, 
    select: { username: true, email: true, role: true}, 
  }); 

  if (!adminUser) {
    adminUser = userRepo.create({
      username: 'admin', 
      email: 'admin@wow.com', 
      password: 'admin_password', 
      role: 'admin'
    })
    await userRepo.save(adminUser); 
    console.log('Admin user saved', adminUser); 
  } else {
    console.log('Admin user already exists', adminUser); 
  }
};

// seedUsers();
