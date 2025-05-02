import "dotenv/config";
import prisma_client from "../src/config/prisma";
import { incidents,admins } from "./data";
import { createRow } from "../src/core/prismaFunctions";

async function main() {
  console.log('Seeding dummy data...');
  try{
    await seedIncidents();
    await seedAdmins();
    console.log('Seeding completed! ✅');
  }catch(err){
    console.error('Error seeding data:', err); 
  }
}

async function seedIncidents(){
  for (const val of incidents){
    try{
      await createRow(prisma_client.incident, val);
      console.log('Dummy data seeded successfully! ✅');
    }catch(err){
      console.error('Error seeding incidents:', err);
    }
  }
}

async function seedAdmins(){
  for (const val of admins){
    try{
      await createRow(prisma_client.admin, val);
      console.log('Dummy data seeded successfully! ✅');
    }catch(err){
      console.error('Error seeding admins:', err);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma_client.$disconnect();
  });
