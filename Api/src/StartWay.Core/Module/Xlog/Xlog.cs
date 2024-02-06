using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StartWay.Module.Xlog
{
    public class Xlog:FullAuditedEntity
    {
        [MaxLength(500)]
        public string Log { get; set; }

    }
}
