using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace StartWay.EntityFrameworkCore
{
    public static class StartWayDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<StartWayDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<StartWayDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
