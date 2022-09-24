echo "Publishing Model to Database..."
npx prisma db push
sleep 3
echo "Starting server..."
yarn start:prod