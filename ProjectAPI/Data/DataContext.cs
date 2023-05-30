
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectAPI.Models;

namespace ProjectAPI.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<SuperHero> SuperHeroes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .HasMany(s => s.UserRoles)
            .WithOne(m => m.User)
            .HasForeignKey(m => m.UserId)
            .IsRequired();

            builder.Entity<Role>()
            .HasMany(s => s.UserRoles)
            .WithOne(m => m.Role)
            .HasForeignKey(m => m.RoleId)
            .IsRequired();

            builder.Entity<Message>()
            .HasOne(s => s.Recipient)
            .WithMany(m => m.MessageReceived)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            .HasOne(s => s.Sender)
            .WithMany(m => m.MessageSent)
            .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
