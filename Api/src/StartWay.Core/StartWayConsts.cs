using StartWay.Debugging;

namespace StartWay
{
    public class StartWayConsts
    {
        public const string LocalizationSourceName = "StartWay";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "27485a3f761d472eb7ed2c1cdada6e0b";
    }
}
