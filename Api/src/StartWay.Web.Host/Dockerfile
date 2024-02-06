FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/StartWay.Web.Host/StartWay.Web.Host.csproj", "src/StartWay.Web.Host/"]
COPY ["src/StartWay.Web.Core/StartWay.Web.Core.csproj", "src/StartWay.Web.Core/"]
COPY ["src/StartWay.Application/StartWay.Application.csproj", "src/StartWay.Application/"]
COPY ["src/StartWay.Core/StartWay.Core.csproj", "src/StartWay.Core/"]
COPY ["src/StartWay.EntityFrameworkCore/StartWay.EntityFrameworkCore.csproj", "src/StartWay.EntityFrameworkCore/"]
WORKDIR "/src/src/StartWay.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/StartWay.Web.Host", "src/StartWay.Web.Host"]
COPY ["src/StartWay.Web.Core", "src/StartWay.Web.Core"]
COPY ["src/StartWay.Application", "src/StartWay.Application"]
COPY ["src/StartWay.Core", "src/StartWay.Core"]
COPY ["src/StartWay.EntityFrameworkCore", "src/StartWay.EntityFrameworkCore"]
WORKDIR "/src/src/StartWay.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "StartWay.Web.Host.dll"]
