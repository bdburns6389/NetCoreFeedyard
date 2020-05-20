# Create image to run fully built app on.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Create node image to copy react assets to and build react project.
FROM node:alpine as react-builder
WORKDIR /app
COPY ./client/package.json .
RUN npm install
COPY ./client .
RUN npm run build

# Create image to restore and build net core app.
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as netcore-builder
WORKDIR /src
COPY ./API/*.csproj .
RUN dotnet restore --disable-parallel
COPY ./API .
RUN dotnet build "API.csproj" -c Release -o /app

# Create image to copy over react build and publish API.
FROM netcore-builder AS publish
RUN rm -rf wwwroot
COPY --from=react-builder ./app/build ./wwwroot
RUN dotnet publish "API.csproj" -c Release -o /app

# Use base image to run fully built app.
FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "API.dll"]