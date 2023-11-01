 # build stage
FROM node:18-alpine as build

WORKDIR /app
# copy everything
COPY . .
# install dependencies
RUN yarn
# build the SvelteKit app
RUN yarn run build

# run stage, to separate it from the build stage, to save disk storage
FROM node:18-alpine

WORKDIR /app

# copy stuff from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./

# expose the app's port
EXPOSE 3000
# run the server
CMD ["node", "build"]
