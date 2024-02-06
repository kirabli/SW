using System.ComponentModel.DataAnnotations;

namespace StartWay.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}