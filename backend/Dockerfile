
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["CompanyKeeper.API/CompanyKeeper.API.csproj", "CompanyKeeper.API/"]
COPY ["CompanyKeeper.Core/CompanyKeeper.Core.csproj", "CompanyKeeper.Core/"]
COPY ["CompanyKeeper.Data/CompanyKeeper.Data.csproj", "CompanyKeeper.Data/"]
RUN dotnet restore "CompanyKeeper.API/CompanyKeeper.API.csproj"

# Copy all files and build the project
COPY . .
WORKDIR "/src/CompanyKeeper.API"
RUN dotnet build "CompanyKeeper.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "CompanyKeeper.API.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80
ENTRYPOINT ["dotnet", "CompanyKeeper.API.dll"]
