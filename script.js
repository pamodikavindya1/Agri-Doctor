/**
 * AgriDoctor Pro - Professional AI Disease Detection System
 * Version 2.1
 */

// ==================== DISEASE DATABASE ====================
// image: "images/rust.jpg" වගේ field එකක් එකතු කළොත් result එකේ ඡායාරූපය පෙන්වයි (අවශ්‍ය නම් පමණක්)
const DISEASE_DB = {
    "rust": {
        name: "මලකඩ රෝගය",
        scientific: "Puccinia spp.",
        treatment: "සල්ෆර් අඩංගු දිලීර නාශක යොදන්න. රෝගී කොළ ඉවත් කරන්න. තෙතමනය අඩු කරන්න. සති 2ක් පුරා ප්‍රතිකාර කරන්න.",
        prevention: "නිරෝගී බීජ භාවිතා කරන්න. භෝග මාරු කිරීම කරන්න. වාතාශ්‍රය හොඳින් ලබාදෙන්න.",
        severity: "high",
        icon: "🦠"
    },
    "leaf curl": {
        name: "කොළ හකුලන රෝගය",
        scientific: "Taphrina deformans",
        treatment: "කොහොඹ තෙල් හෝ කෘමිනාශක භාවිතා කරන්න. දින 7කට වරක් ඉසින්න. රෝගී කොළ එකතු කර පුළුස්සා දමන්න.",
        prevention: "ශීත කාලයේදී තඹ අඩංගු දිලීර නාශක ඉසින්න. පැලෑටි අතර පරතරය වැඩි කරන්න.",
        severity: "medium",
        icon: "🍃"
    },
    "blight": {
        name: "අංගමාරය",
        scientific: "Phytophthora infestans",
        treatment: "රෝගී කොටස් කපා පුළුස්සා දමන්න. මැන්කොසෙබ් දිලීර නාශක යොදන්න. වාතාශ්‍රය හොඳින් ලබාදෙන්න.",
        prevention: "අධික තෙතමනයෙන් වලකින්න. පැල අතර පරතරය වැඩි කරන්න. වැසි සමයේදී විශේෂ සැලකිල්ල යොදන්න.",
        severity: "high",
        icon: "⚠️"
    },
    "powdery mildew": {
        name: "පවුඩරි මිල්ඩියු",
        scientific: "Erysiphales",
        treatment: "සල්ෆර් අඩංගු කුඩු ඉසින්න. වාතාශ්‍රය හොඳින් ලබාදෙන්න. කොළ මතට ජලය ඉසීමෙන් වලකින්න.",
        prevention: "නියමිත වේලාවට පොහොර යොදන්න. ප්‍රතිරෝධී ප්‍රභේද භාවිතා කරන්න.",
        severity: "medium",
        icon: "🌾"
    },
    "bacterial wilt": {
        name: "බැක්ටීරියා මැලවීම",
        scientific: "Ralstonia solanacearum",
        treatment: "පස විෂබීජහරණය කර හුණු යොදන්න. භෝග මාරු කිරීම කරන්න. රෝගී පැල වහාම ඉවත් කරන්න.",
        prevention: "නිරෝගී බීජ පැල භාවිතා කරන්න. ජලය බැසයාම හොඳින් කරන්න.",
        severity: "high",
        icon: "💧"
    },
    "mosaic virus": {
        name: "මොසයික් වෛරසය",
        scientific: "Tobacco Mosaic Virus",
        treatment: "Aphids කෘමීන් පාලනය කරන්න. රෝගී පැල ඉවත් කර පුළුස්සා දමන්න. වෛරසයෙන් තොර බීජ භාවිතා කරන්න.",
        prevention: "වගා භූමිය පිරිසිදුව තබා ගන්න. කෘමිනාශක නිතිපතා ඉසින්න.",
        severity: "high",
        icon: "🦟"
    },
    "downy mildew": {
        name: "ඩව්නි මිල්ඩියු",
        scientific: "Peronospora spp.",
        treatment: "වාතාශ්‍රය වැඩි කර දිලීර නාශක යොදන්න. කොළ වියළි ලෙස තබා ගන්න. රෝගී කොළ ඉවත් කරන්න.",
        prevention: "උදේ පාන්දර වතුර දමන්න. පැල අතර පරතරය වැඩි කරන්න.",
        severity: "medium",
        icon: "💨"
    },
    "anthracnose": {
        name: "ඇන්ත්‍රැක්නෝස්",
        scientific: "Colletotrichum spp.",
        treatment: "මැන්කොසෙබ් හෝ ක්ලෝරොතලොනිල් දිලීර නාශක භාවිතා කරන්න. රෝගී කොටස් කපා ඉවත් කරන්න.",
        prevention: "නිරෝගී බීජ භාවිතා කරන්න. වගා භූමියේ සනීපාරක්ෂාව පවත්වා ගන්න.",
        severity: "medium",
        icon: "🍂"
    },
    "root rot": {
        name: "මුල් කුණුවීම",
        scientific: "Fusarium spp.",
        treatment: "ජලය බැසයාම විධිමත් කරන්න. මුලට හානි නොවන ලෙස ප්‍රතිකාර කරන්න. ට්‍රයිකොඩර්මා දිලීර නාශක යොදන්න.",
        prevention: "අධික වතුර දැමීමෙන් වලකින්න. පසෙහි PH අගය නිවැරදිව තබා ගන්න.",
        severity: "high",
        icon: "🪱"
    },
    "early blight": {
        name: "අර්ලි බ්ලයිට්",
        scientific: "Alternaria solani",
        treatment: "නියමිත කාලයට පොහොර සහ දිලීර නාශක යොදන්න. පහළ කොළ ඉවත් කරන්න. ක්ලෝරොතලොනිල් ඉසින්න.",
        prevention: "භෝග මාරු කිරීම කරන්න. ප්‍රතිරෝධී ප්‍රභේද භාවිතා කරන්න.",
        severity: "medium",
        icon: "🍂"
    },
    "late blight": {
        name: "ලේට් බ්ලයිට්",
        scientific: "Phytophthora infestans",
        treatment: "දිලීර නාශක දියරයක් දින 7කට වරක් ඉසින්න. වැසි සමයේදී විශේෂ සැලකිල්ල යොදන්න. රෝගී පැල ඉවත් කරන්න.",
        prevention: "ජලය බැසයාම හොඳින් කරන්න. ඉහළ තෙතමනයෙන් වලකින්න.",
        severity: "high",
        icon: "⚠️"
    },
    "leaf spot": {
        name: "කොළ පුල්ලි රෝගය",
        scientific: "Cercospora spp.",
        treatment: "පත්‍ර මතට ජලය ඉසීමෙන් වලකින්න. දිලීර නාශක ඉසින්න. රෝගී කොළ එකතු කර විනාශ කරන්න.",
        prevention: "වාතාශ්‍රය හොඳින් ලබාදෙන්න. පැල අතර පරතරය වැඩි කරන්න.",
        severity: "low",
        icon: "🔴"
    },
    "black spot": {
        name: "කළු පුල්ලි රෝගය",
        scientific: "Diplocarpon rosae",
        treatment: "රෝගී කොළ වහාම ඉවත් කරන්න. වාතාශ්‍රය වැඩි කරන්න. තෙල් මත පදනම් වූ දිලීර නාශක ඉසින්න.",
        prevention: "උදේ පාන්දර වතුර දමන්න. පැල යට පිරිසිදුව තබා ගන්න.",
        severity: "medium",
        icon: "⚫"
    },
    "damping off": {
        name: "පැල කුණුවීම",
        scientific: "Pythium spp.",
        treatment: "තවාන් පස විෂබීජහරණය කරන්න. අධික තෙතමනයෙන් වලකින්න. ට්‍රයිකොඩර්මා වර්මි කොම්පොස්ට් එක් කරන්න.",
        prevention: "නිරෝගී බීජ භාවිතා කරන්න. පස හොඳින් ජලය බැස යන ලෙස සකස් කරන්න.",
        severity: "high",
        icon: "🌱"
    },
    "clubroot": {
        name: "ක්ලබ් රූට්",
        scientific: "Plasmodiophora brassicae",
        treatment: "පසට හුණු එක් කර PH අගය 7.0 කරන්න. භෝග මාරු කිරීම කරන්න. ප්‍රතිරෝධී ප්‍රභේද භාවිතා කරන්න.",
        prevention: "හුණු නිතිපතා එක් කරන්න. වගා භූමියේ සනීපාරක්ෂාව පවත්වා ගන්න.",
        severity: "high",
        icon: "🥬"
    },
    "rice blast": {
        name: "වී බ්ලාස්ට් රෝගය",
        scientific: "Magnaporthe oryzae",
        treatment: "රෝගී කොළ සහ කරල් ඉවත් කරන්න. නයිට්‍රජන් පොහොර අධිකව යෙදීම නවත්වන්න. අවශ්‍ය නම් නිර්දේශිත දිලීර නාශක ගැන කෘෂිකර්ම නිලධාරියෙකුගෙන් අසන්න.",
        prevention: "ප්‍රතිරෝධී වී ප්‍රභේද වගා කරන්න. නිරෝගී බීජ භාවිතා කරන්න. නිර්දේශිත පොහොර ප්‍රමාණය පමණක් යොදන්න.",
        severity: "high",
        icon: "🌾"
    },
    "rice brown spot": {
        name: "වී දුඹුරු පුල්ලි රෝගය",
        scientific: "Bipolaris oryzae",
        treatment: "පසේ පෝෂක (විශේෂයෙන් පොටෑසියම්) ඌනතාව නිවැරදි කරන්න. නිරෝගී බීජ භාවිතා කරන්න. රෝගය වැඩි නම් නිලධාරීන්ගේ නිර්දේශයට දිලීර නාශක යොදන්න.",
        prevention: "සමබර පොහොර යොදන්න. ජලය හිඟ නොවන ලෙස වගාව පවත්වන්න.",
        severity: "medium",
        icon: "🍂"
    },
    "rice sheath blight": {
        name: "වී කොපු අංගමාරය",
        scientific: "Rhizoctonia solani",
        treatment: "පැල අතර පරතරය වැඩි කරන්න. නයිට්‍රජන් අධිකව යෙදීමෙන් වළකින්න. රෝගය දරුණු නම් නිලධාරියෙකුගේ උපදෙස් පරිදි දිලීර නාශක යොදන්න.",
        prevention: "වල් පැළෑටි සහ පරණ ඉතිරි කොටස් ඉවත් කරන්න. කුඹුර හොඳින් වාතාශ්‍රය ලැබෙන ලෙස පවත්වන්න.",
        severity: "high",
        icon: "🌾"
    },
    "bacterial leaf blight": {
        name: "වී බැක්ටීරියා පත්‍ර අංගමාරය",
        scientific: "Xanthomonas oryzae pv. oryzae",
        treatment: "රෝගී කොටස් ඉවත් කරන්න. නයිට්‍රජන් පොහොර අඩු කරන්න. කුඹුරේ ජලය බැස යාම හොඳින් පාලනය කරන්න.",
        prevention: "ප්‍රතිරෝධී ප්‍රභේද සහ නිරෝගී බීජ භාවිතා කරන්න. උපකරණ පිරිසිදුව තබා ගන්න.",
        severity: "high",
        icon: "⚠️"
    },
    "rice tungro": {
        name: "වී ටුංග්‍රෝ රෝගය",
        scientific: "Rice tungro viruses",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. වෛරසය බෙදා හරින කොළ පෙරළි කෘමීන් (ලීෆ්හොපර්) පාලනය කරන්න.",
        prevention: "ප්‍රතිරෝධී ප්‍රභේද වගා කරන්න. අසල කුඹුරු සමඟ එකම කාලයේ වගා කරන්න.",
        severity: "high",
        icon: "🦟"
    },
    "tea blister blight": {
        name: "තේ බිබිලි අංගමාරය",
        scientific: "Exobasidium vexans",
        treatment: "රෝගී දළු නිතිපතා නෙළා ඉවත් කරන්න. තෙත්, මීදුම් සහිත කාලවලදී නිර්දේශිත දිලීර නාශක ගැන තේ පර්යේෂණ ආයතනයෙන් හෝ නිලධාරීන්ගෙන් උපදෙස් ගන්න.",
        prevention: "දළු නෙළීමේ චක්‍රය නිසි ලෙස පවත්වන්න. සෙවණ පාලනය කර වාතාශ්‍රය වැඩි කරන්න.",
        severity: "high",
        icon: "🍃"
    },
    "banana sigatoka": {
        name: "කෙසෙල් සිගටෝකා රෝගය",
        scientific: "Pseudocercospora spp.",
        treatment: "රෝගී පරණ කොළ කපා ඉවත් කරන්න. පැල අතර පරතරය රැක ගන්න. නිර්දේශිත දිලීර නාශක ගැන නිලධාරීන්ගෙන් අසන්න.",
        prevention: "ජලය බැස යාම හොඳින් කරන්න. අනවශ්‍ය පැළ ඉවත් කරන්න.",
        severity: "medium",
        icon: "🍌"
    },
    "panama disease": {
        name: "කෙසෙල් පැනමා මැලවීම",
        scientific: "Fusarium oxysporum f. sp. cubense",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. ආසාදිත පස්, ජලය, උපකරණ වෙනත් තැනකට ගෙන නොයන්න. සාර්ථක ප්‍රතිකාරයක් නැත, නිලධාරීන්ට දන්වන්න.",
        prevention: "නිරෝගී පැළ පමණක් භාවිතා කරන්න. ප්‍රතිරෝධී ප්‍රභේද ගැන විමසන්න.",
        severity: "high",
        icon: "🍌"
    },
    "gray mold": {
        name: "අළු පුස් රෝගය",
        scientific: "Botrytis cinerea",
        treatment: "රෝගී කොටස් ඉවත් කරන්න. වාතාශ්‍රය සහ ආලෝකය වැඩි කර තෙතමනය අඩු කරන්න.",
        prevention: "ජලය පත්‍ර මත නොවැටෙන ලෙස දමන්න. නෙළූ පසු ඉතිරි කොටස් පිරිසිදු කරන්න.",
        severity: "medium",
        icon: "🌫️"
    },
    "fusarium wilt": {
        name: "ෆියුසේරියම් මැලවීම",
        scientific: "Fusarium oxysporum",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. බෝග මාරු කරන්න. ට්‍රයිකොඩර්මා වැනි ජෛව පාලනය ගැන නිලධාරීන්ගෙන් අසන්න.",
        prevention: "ප්‍රතිරෝධී ප්‍රභේද සහ නිරෝගී පැළ භාවිතා කරන්න. ජලය බැස යාම හොඳින් කරන්න.",
        severity: "high",
        icon: "🥀"
    },
    "verticillium wilt": {
        name: "වර්ටිසීලියම් මැලවීම",
        scientific: "Verticillium dahliae",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. ආසාදිත ඉඩමේ වසර කිහිපයක් එකම කුලයේ බෝග නොවවන්න.",
        prevention: "ප්‍රතිරෝධී ප්‍රභේද භාවිතා කරන්න. උපකරණ පිරිසිදු කරන්න.",
        severity: "medium",
        icon: "🥀"
    },
    "septoria leaf spot": {
        name: "සෙප්ටෝරියා කොළ පුල්ලි රෝගය",
        scientific: "Septoria lycopersici",
        treatment: "පහළ රෝගී කොළ ඉවත් කරන්න. පත්‍ර මතට ජලය ඉසීමෙන් වළකින්න. අවශ්‍ය නම් නිර්දේශිත දිලීර නාශක යොදන්න.",
        prevention: "බෝග මාරු කරන්න. පැල අතර පරතරය වැඩි කරන්න.",
        severity: "medium",
        icon: "⚪"
    },
    "bacterial spot": {
        name: "බැක්ටීරියා පුල්ලි රෝගය",
        scientific: "Xanthomonas spp.",
        treatment: "රෝගී කොළ සහ ගෙඩි ඉවත් කරන්න. තෙත් කොළ සමඟ වැඩ කිරීමෙන් වළකින්න. තඹ අඩංගු නිෂ්පාදන ගැන නිලධාරීන්ගෙන් අසන්න.",
        prevention: "නිරෝගී බීජ සහ පැළ භාවිතා කරන්න. බෝග මාරු කරන්න.",
        severity: "medium",
        icon: "🔴"
    },
    "common scab": {
        name: "ගැටිති කබොල රෝගය (අර්තාපල්)",
        scientific: "Streptomyces scabies",
        treatment: "මෙම රෝගයට ප්‍රතිකාර අඩුයි. ගෙඩි සැදෙන කාලයේ පසේ තෙතමනය රැක ගන්න. පසේ pH අගය අධික නම් අඩු කරන්න.",
        prevention: "සහතික කළ බීජ අර්තාපල් භාවිතා කරන්න. බෝග මාරු කරන්න.",
        severity: "low",
        icon: "🥔"
    },
    "citrus canker": {
        name: "දෙහි කැන්කර රෝගය",
        scientific: "Xanthomonas citri",
        treatment: "රෝගී අතු කපා පුළුස්සා දමන්න. තඹ අඩංගු ඉසීම් ගැන නිලධාරීන්ගෙන් අසන්න. උපකරණ විෂබීජහරණය කරන්න.",
        prevention: "නිරෝගී පැළ පමණක් සිටුවන්න. කොළ කැණීමේ පණුවා පාලනය කරන්න.",
        severity: "high",
        icon: "🍋"
    },
    "sooty mold": {
        name: "කළු පුස් (සූටි මෝල්ඩ්) රෝගය",
        scientific: "Capnodium spp.",
        treatment: "පුස් වර්ධනයට හේතු වන කෘමීන් (ඇෆිඩ්, කොකිඩ්, සුදු මැස්සන්) පාලනය කරන්න. කොළ මත කළු තට්ටුව සබන් ජලයෙන් සෝදා ඉවත් කරන්න.",
        prevention: "කෘමීන් නිතිපතා පරීක්ෂා කරන්න. වගාව වාතාශ්‍රය සහිතව තබන්න.",
        severity: "low",
        icon: "⚫"
    },
    "white rust": {
        name: "සුදු මලකඩ රෝගය",
        scientific: "Albugo candida",
        treatment: "රෝගී කොළ ඉවත් කරන්න. පත්‍ර මත ජලය ඉසීමෙන් වළකින්න. බෝග මාරු කරන්න.",
        prevention: "නිරෝගී බීජ භාවිතා කරන්න. වල් පැළෑටි ඉවත් කරන්න.",
        severity: "medium",
        icon: "⚪"
    },
    "cassava mosaic": {
        name: "මඤ්ඤොක්කා මොසෙයික් රෝගය",
        scientific: "Cassava mosaic geminiviruses",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. වෛරසය බෙදන සුදු මැස්සන් පාලනය කරන්න.",
        prevention: "රෝගයෙන් තොර සිටුවන ද්‍රව්‍ය භාවිතා කරන්න. ප්‍රතිරෝධී ප්‍රභේද සොයන්න.",
        severity: "high",
        icon: "🌿"
    },
    "chilli leaf curl": {
        name: "මිරිස් කොළ කොඩුවීමේ රෝගය",
        scientific: "Begomovirus (leaf curl virus)",
        treatment: "රෝගී පැල ඉවත් කර විනාශ කරන්න. සුදු මැස්සන් සහ ත්‍රිප්ස් පාලනය කරන්න (කොහොඹ තෙල් ඉසීම වැනි).",
        prevention: "තවානේදී කෘමි දැල් භාවිතා කරන්න. වල් පැළෑටි ඉවත් කරන්න.",
        severity: "high",
        icon: "🌶️"
    },
    "papaya ringspot": {
        name: "පැපොල් රින්ග්ස්පොට් වෛරසය",
        scientific: "Papaya ringspot virus",
        treatment: "රෝගී ගස් ඉවත් කර විනාශ කරන්න. ඇෆිඩ් කෘමීන් පාලනය කරන්න. මෙයට ඖෂධයක් නැත.",
        prevention: "වෛරසයෙන් තොර පැළ භාවිතා කරන්න. අසල ආසාදිත ගස් ඉවත් කරන්න.",
        severity: "high",
        icon: "🍈"
    },
    "gummy stem blight": {
        name: "වැල් අංගමාරය (කොමඩු වර්ග)",
        scientific: "Didymella bryoniae",
        treatment: "රෝගී කොටස් ඉවත් කරන්න. ජලය පත්‍ර මත නොවැටෙන ලෙස දමන්න. බෝග මාරු කරන්න.",
        prevention: "ඉතිරි කොටස් විනාශ කරන්න. වගාවේ වාතාශ්‍රය සහිත පරතරයක් තබන්න.",
        severity: "medium",
        icon: "🥒"
    },
    "white mold": {
        name: "සුදු පුස් රෝගය (ස්ක්ලෙරෝටිනියා)",
        scientific: "Sclerotinia sclerotiorum",
        treatment: "රෝගී පැල ඉවත් කරන්න. වාතාශ්‍රය වැඩි කර තෙතමනය අඩු කරන්න. ට්‍රයිකොඩර්මා වැනි ජෛව පාලනය ගැන විමසන්න.",
        prevention: "බෝග මාරු කරන්න. පැල අතර පරතරය වැඩි කරන්න.",
        severity: "medium",
        icon: "⚪"
    },
    "healthy": {
        name: "සෞඛ්‍ය සම්පන්න",
        scientific: "No disease detected",
        treatment: "ඔබේ පැළෑටිය සෞඛ්‍ය සම්පන්නයි! නිතිපතා ජලය හා පොහොර ලබා දෙන්න. වගාව දිගටම කරගෙන යන්න. දිනපතා නිරීක්ෂණය කරන්න.",
        prevention: "කාබනික පොහොර භාවිතා කරන්න. පළිබෝධ පාලනය කරන්න. නිතිපතා වල් නෙලීම කරන්න.",
        severity: "none",
        icon: "✅"
    }
};

// ==================== CONSTANTS ====================
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/DV76m5VCP/";
const LABELS = ["healthy", "rust", "leaf curl", "powdery mildew"]; // fallback පමණි
const MIN_CONFIDENCE = 0.6;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const SEVERITY_COLOR = { high: "#f44336", medium: "#ff9800", low: "#4caf50", none: "#4caf50" };
const RENT_KEY = "agri_rentals_v1";
const LANG_KEY = "agri_lang";

// [සිංහල (data හි සුරැකෙන අගය), English]
const DISTRICTS = [["කොළඹ","Colombo"],["ගම්පහ","Gampaha"],["කළුතර","Kalutara"],["මහනුවර","Kandy"],["මාතලේ","Matale"],["නුවරඑළිය","Nuwara Eliya"],["ගාල්ල","Galle"],["මාතර","Matara"],["හම්බන්තොට","Hambantota"],["යාපනය","Jaffna"],["කුරුණෑගල","Kurunegala"],["අනුරාධපුර","Anuradhapura"],["පොළොන්නරුව","Polonnaruwa"],["බදුල්ල","Badulla"],["මොනරාගල","Monaragala"],["රත්නපුර","Ratnapura"],["කෑගල්ල","Kegalle"],["වව්නියාව","Vavuniya"],["මන්නාරම","Mannar"],["මුලතිව්","Mullaitivu"],["කිලිනොච්චි","Kilinochchi"],["ත්‍රිකුණාමලය","Trincomalee"],["මඩකලපුව","Batticaloa"],["අම්පාර","Ampara"],["පුත්තලම","Puttalam"]];
const EQUIPMENT = [["Water tank","Water tank"],["Tractor","Tractor"],["Harvesting machine","Harvesting machine"],["වෙනත්","Other"]];

// !!! උදාහරණ දත්ත පමණි. ඇත්ත නිලධාරීන්ගේ තොරතුරු මෙතන දාන්න.
const EXPERTS = [
    { name: "උදාහරණ නිලධාරියා 1", nameEn: "Sample Officer 1", district: "මහනුවර", phone: "0700000000", email: "" },
    { name: "උදාහරණ නිලධාරියා 2", nameEn: "Sample Officer 2", district: "ගාල්ල", phone: "0700000001", email: "" }
];

// Demo සිතියම් දත්ත - දිස්ත්‍රික්ක 25ටම (DIST_COORDS පසුව පිරවේ)
const ZONES = [];
const DEMO_RISK = {
    "මහනුවර": ["high", "මලකඩ රෝගය වාර්තා වේ", "Rust disease reported"],
    "කොළඹ": ["medium", "නිරීක්ෂණය අවශ්‍යයි", "Monitoring needed"],
    "ගාල්ල": ["medium", "කොළ පුල්ලි රෝගය", "Leaf spot disease"],
    "කුරුණෑගල": ["medium", "නිරීක්ෂණය අවශ්‍යයි", "Monitoring needed"]
};
const RISK_COLOR = { high: "#f44336", medium: "#ff9800", low: "#4caf50" };

// ==================== ENGLISH DISEASE TEXT ====================
const DISEASE_EN = {
    "rust": { name: "Rust disease", treatment: "Apply sulphur-based fungicides. Remove infected leaves. Reduce humidity. Continue treatment for 2 weeks.", prevention: "Use healthy seeds. Practise crop rotation. Ensure good air circulation." },
    "leaf curl": { name: "Leaf curl disease", treatment: "Use neem oil or an insecticide. Spray every 7 days. Collect and burn infected leaves.", prevention: "Spray copper-based fungicides in the cool season. Increase spacing between plants." },
    "blight": { name: "Blight", treatment: "Cut off and burn infected parts. Apply mancozeb fungicide. Ensure good air circulation.", prevention: "Avoid excess moisture. Increase plant spacing. Take extra care in the rainy season." },
    "powdery mildew": { name: "Powdery mildew", treatment: "Dust with sulphur powder. Ensure good air circulation. Avoid wetting the leaves.", prevention: "Fertilise on time. Use resistant varieties." },
    "bacterial wilt": { name: "Bacterial wilt", treatment: "Disinfect the soil and apply lime. Practise crop rotation. Remove infected plants immediately.", prevention: "Use healthy seedlings. Ensure good drainage." },
    "mosaic virus": { name: "Mosaic virus", treatment: "Control aphids. Remove and burn infected plants. Use virus-free seeds.", prevention: "Keep the field clean. Spray insecticides regularly." },
    "downy mildew": { name: "Downy mildew", treatment: "Increase air circulation and apply fungicide. Keep leaves dry. Remove infected leaves.", prevention: "Water early in the morning. Increase plant spacing." },
    "anthracnose": { name: "Anthracnose", treatment: "Use mancozeb or chlorothalonil fungicides. Cut off and remove infected parts.", prevention: "Use healthy seeds. Keep the field clean." },
    "root rot": { name: "Root rot", treatment: "Improve drainage. Treat without damaging the roots. Apply Trichoderma.", prevention: "Avoid overwatering. Keep the soil pH correct." },
    "early blight": { name: "Early blight", treatment: "Apply fertiliser and fungicide on time. Remove lower leaves. Spray chlorothalonil.", prevention: "Practise crop rotation. Use resistant varieties." },
    "late blight": { name: "Late blight", treatment: "Spray a fungicide solution every 7 days. Take extra care in the rainy season. Remove infected plants.", prevention: "Ensure good drainage. Avoid high humidity." },
    "leaf spot": { name: "Leaf spot disease", treatment: "Avoid wetting the leaves. Spray fungicide. Collect and destroy infected leaves.", prevention: "Ensure good air circulation. Increase plant spacing." },
    "black spot": { name: "Black spot disease", treatment: "Remove infected leaves immediately. Increase air circulation. Spray an oil-based fungicide.", prevention: "Water early in the morning. Keep the area under the plants clean." },
    "damping off": { name: "Damping off", treatment: "Disinfect the nursery soil. Avoid excess moisture. Add Trichoderma vermicompost.", prevention: "Use healthy seeds. Prepare well-drained soil." },
    "clubroot": { name: "Clubroot", treatment: "Add lime to raise soil pH to 7.0. Practise crop rotation. Use resistant varieties.", prevention: "Add lime regularly. Keep the field clean." },
    "rice blast": { name: "Rice blast", treatment: "Remove infected leaves and panicles. Stop applying excess nitrogen fertiliser. Ask an agriculture officer about recommended fungicides if needed.", prevention: "Grow resistant rice varieties. Use healthy seed. Apply only the recommended amount of fertiliser." },
    "rice brown spot": { name: "Rice brown spot", treatment: "Correct soil nutrient deficiencies (especially potassium). Use healthy seed. Apply fungicides only as recommended by an officer if severe.", prevention: "Apply balanced fertiliser. Avoid water stress in the field." },
    "rice sheath blight": { name: "Rice sheath blight", treatment: "Increase plant spacing. Avoid excess nitrogen. If severe, apply fungicides only on an officer's advice.", prevention: "Remove weeds and crop residues. Keep the field well ventilated." },
    "bacterial leaf blight": { name: "Bacterial leaf blight (rice)", treatment: "Remove infected parts. Reduce nitrogen fertiliser. Manage field drainage well.", prevention: "Use resistant varieties and healthy seed. Keep tools clean." },
    "rice tungro": { name: "Rice tungro", treatment: "Remove and destroy infected plants. Control the green leafhoppers that spread the virus.", prevention: "Grow resistant varieties. Synchronise planting with neighbouring fields." },
    "tea blister blight": { name: "Tea blister blight", treatment: "Pluck and remove infected shoots regularly. In wet, misty weather ask the tea research institute or an officer about recommended fungicides.", prevention: "Keep to the correct plucking round. Manage shade and improve air flow." },
    "banana sigatoka": { name: "Banana sigatoka", treatment: "Cut off and remove infected old leaves. Keep plants well spaced. Ask an officer about recommended fungicides.", prevention: "Ensure good drainage. Remove unwanted suckers." },
    "panama disease": { name: "Panama disease (banana)", treatment: "Remove and destroy infected plants. Do not move soil, water or tools from infected areas. There is no effective cure - inform an officer.", prevention: "Use only healthy planting material. Ask about resistant varieties." },
    "gray mold": { name: "Gray mold", treatment: "Remove infected parts. Increase air flow and light and reduce humidity.", prevention: "Water so that leaves stay dry. Clear crop residues after harvest." },
    "fusarium wilt": { name: "Fusarium wilt", treatment: "Remove and destroy infected plants. Rotate crops. Ask an officer about biocontrol such as Trichoderma.", prevention: "Use resistant varieties and healthy seedlings. Ensure good drainage." },
    "verticillium wilt": { name: "Verticillium wilt", treatment: "Remove and destroy infected plants. Do not grow the same crop family on infected land for several years.", prevention: "Use resistant varieties. Clean tools." },
    "septoria leaf spot": { name: "Septoria leaf spot", treatment: "Remove infected lower leaves. Avoid wetting leaves. Use recommended fungicides if needed.", prevention: "Rotate crops. Increase plant spacing." },
    "bacterial spot": { name: "Bacterial spot", treatment: "Remove infected leaves and fruit. Avoid handling wet plants. Ask an officer about copper-based products.", prevention: "Use healthy seed and seedlings. Rotate crops." },
    "common scab": { name: "Common scab (potato)", treatment: "Treatment options are limited. Keep soil moist during tuber formation. Lower soil pH if it is too high.", prevention: "Use certified seed potatoes. Rotate crops." },
    "citrus canker": { name: "Citrus canker", treatment: "Prune and burn infected branches. Ask an officer about copper sprays. Disinfect tools.", prevention: "Plant only healthy seedlings. Control leaf miner." },
    "sooty mold": { name: "Sooty mold", treatment: "Control the insects (aphids, scales, whiteflies) that feed the mold. Wash the black coating off leaves with soapy water.", prevention: "Inspect for insects regularly. Keep the crop well ventilated." },
    "white rust": { name: "White rust", treatment: "Remove infected leaves. Avoid wetting leaves. Rotate crops.", prevention: "Use healthy seed. Remove weeds." },
    "cassava mosaic": { name: "Cassava mosaic disease", treatment: "Remove and destroy infected plants. Control the whiteflies that spread the virus.", prevention: "Use disease-free planting material. Look for resistant varieties." },
    "chilli leaf curl": { name: "Chilli leaf curl", treatment: "Remove and destroy infected plants. Control whiteflies and thrips (for example with neem oil).", prevention: "Use insect nets in the nursery. Remove weeds." },
    "papaya ringspot": { name: "Papaya ringspot virus", treatment: "Remove and destroy infected trees. Control aphids. There is no cure.", prevention: "Use virus-free seedlings. Remove infected trees nearby." },
    "gummy stem blight": { name: "Gummy stem blight (cucurbits)", treatment: "Remove infected parts. Water so that leaves stay dry. Rotate crops.", prevention: "Destroy crop residues. Keep a well-ventilated spacing." },
    "white mold": { name: "White mold (Sclerotinia)", treatment: "Remove infected plants. Increase air flow and reduce humidity. Ask about biocontrol such as Trichoderma.", prevention: "Rotate crops. Increase plant spacing." },
    "healthy": { name: "Healthy", treatment: "Your plant is healthy! Keep watering and fertilising regularly and check it daily.", prevention: "Use organic fertiliser. Control pests. Weed regularly." }
};

// ==================== LANGUAGE TEXT ====================
const I18N = {
  si: {
    nav_analyze: "විශ්ලේෂණය", nav_map: "සිතියම", nav_rent: "කුලිය", nav_expert: "විශේෂඥ", nav_help: "සහාය",
    hero_tag: "ශ්‍රී ලංකාවේ ගොවීන් වෙනුවෙන්",
    hero_h1: 'AI බලයෙන් <br><span class="grad">ශාක රෝග හඳුනාගන්න</span>',
    hero_p: "ඡායාරූපයක් ගන්න, අපගේ කෘතිම බුද්ධිය රෝගය හඳුනාගෙන ප්‍රතිකර්ම යෝජනා කරයි.",
    start: "ආරම්භ කරන්න", install: "App එක Install කරන්න",
    stat1: "රෝග වර්ග", stat2: "තත්පර කිහිපයකින්", stat3: "නොමිලේ උපදේශන සේවය",
    search_title: "රෝග නාමාවලියෙන් සොයන්න", search_ph: "Rust, Leaf Curl, Blight, Healthy...", search_btn: "සොයන්න",
    upload_title: "AI රෝග විශ්ලේෂණය", upload_p: "පත්‍රයේ ඡායාරූපය Upload කරන්න", upload_small: "JPG, PNG හෝ JPEG (උපරිම 5MB)",
    remove: "ඉවත් කරන්න", analyze: "AI විශ්ලේෂණය",
    map_title: "වගා අවදානම් කලාප සිතියම", risk_high: "ඉහළ අවදානම", risk_med: "මධ්‍යම අවදානම", risk_low: "අඩු අවදානම",
    demo_note: "සිතියමේ දත්ත දැනට උදාහරණ (Demo) පමණි.",
    rent_title: "උපකරණ කුලිය", ph_name: "ඔබේ නම", ph_phone: "දුරකථන අංකය", ph_addr: "ලිපිනය / ගම",
    ph_price: "දිනකට මිල (රු.) - අවශ්‍ය නම්", rent_submit: "උපකරණය ලැයිස්තුගත කරන්න",
    expert_title: "කෘෂිකර්ම විශේෂඥයන්", help_title: "සහාය ලබාගැනීමට",
    hotline: "කෘෂිකර්ම හොට්ලයින්", support247: "", email_h: "විද්‍යුත් තැපෑල",
    site_h: "නිල වෙබ් අඩවිය", more_info: "වැඩිදුර තොරතුරු",
    footer: "2026 AgriDoctor Pro - ශ්‍රී ලංකාවේ ගොවීන් වෙනුවෙන් AI තාක්ෂණය",
    offline: "ඔබ නොබැඳියේ. සමහර විශේෂාංග සීමා වේ.",
    all_districts: "සියලු දිස්ත්‍රික්ක", pick_district: "දිස්ත්‍රික්කය තෝරන්න",
    pick_equipment: "උපකරණය තෝරන්න", all_equipment: "සියලු උපකරණ",
    badge_default: "AI පදනම්", badge_loading: "🔄 AI පූරණය වේ", badge_ready: "✅ AI සූදානම්", badge_none: "⚠️ AI නැත",
    model_loading: "🔄 AI මාදිලිය පූරණය වෙමින්...", model_ok: "✅ AI Model සාර්ථකයි! දැන් රූපයක් Upload කරන්න.",
    model_err: "⚠️ AI Model එක load කිරීම අසාර්ථකයි. ඔබගේ අන්තර්ජාලය පරීක්ෂා කරන්න.",
    enter_name: "😔 කරුණාකර රෝගයේ නමක් ඇතුළත් කරන්න.", no_match: "😔 \"{q}\" සඳහා තොරතුරු නැත.",
    no_match_hint: "උදා: rust, leaf curl, blight, powdery mildew, healthy",
    label_sci: "🔬 විද්‍යාත්මක නම:", label_treat: "💊 ප්‍රතිකාරය:", label_prevent: "🛡️ වැළැක්වීම:",
    upload_first: "📷 කරුණාකර පළමුව රූපයක් Upload කරන්න!",
    model_wait: "AI Model එක පූරණය වෙමින්... තත්පර කිහිපයකින් නැවත උත්සාහ කරන්න.",
    analyzing: "රූපය විශ්ලේෂණය කරයි... කරුණාකර රැඳී සිටින්න.",
    unsure_title: "🤔 රෝගය හරියටම හඳුනාගන්න බැරි වුණා",
    unsure_body: "AI හි විශ්වාසය {c}% පමණයි. පත්‍රය පැහැදිලිව, හොඳ ආලෝකයකින්, එක් පත්‍රයක් පමණක් ඇතුව නැවත ඡායාරූපයක් ගන්න.",
    unsure_help: "තවමත් සැකයක් නම් කෘෂිකර්ම හොට්ලයින් 1920 අමතන්න.",
    confidence: "🎯 නිරවද්‍යතාව:",
    safety: "⚠️ රසායන ද්‍රව්‍ය භාවිතයට පෙර ලේබලයේ මාත්‍රාව කියවා, කෘෂිකර්ම නිලධාරියෙකුගෙන් උපදෙස් ගන්න.",
    analysis_fail: "⚠️ විශ්ලේෂණය අසාර්ථකයි. නැවත උත්සාහ කරන්න.",
    too_big: "ඡායාරූපය 5MB ට වඩා විශාලයි. කුඩා එකක් තෝරන්න.",
    no_experts: "මෙම දිස්ත්‍රික්කයට නිලධාරීන් නැත. කෘෂිකර්ම හොට්ලයින් 1920 අමතන්න.",
    no_rentals: "තවම උපකරණ ලැයිස්තුගත කර නැත. පළමු එක ඔබට එකතු කළ හැක.",
    per_day: "රු. {p} / දිනකට", price_neg: "මිල කතා කර තීරණය",
    phone_bad: "දුරකථන අංකය ඉලක්කම් 10ක් විය යුතුයි (උදා: 0771234567).",
    listed: "ලැයිස්තුගත කළා. (මේ දත්ත දැනට ඔබේ browser එකේ පමණක් සුරැකේ.)",
    district_suffix: "දිස්ත්‍රික්කය", your_photo: "ඔබේ ඡායාරූපය", ref_photo: "රෝගයේ උදාහරණය",
    map_fail: "සිතියම load කළ නොහැකි විය. අන්තර්ජාලය පරීක්ෂා කරන්න. පහත ලැයිස්තුවෙන් තොරතුරු බලන්න.",
    tile_fail: "සිතියම් පින්තූර load වුණේ නැහැ (අන්තර්ජාලය පරීක්ෂා කරන්න)."
  },
  en: {
    nav_analyze: "Analyze", nav_map: "Map", nav_rent: "Rent", nav_expert: "Experts", nav_help: "Help",
    hero_tag: "For Sri Lankan farmers",
    hero_h1: 'Detect plant diseases <br><span class="grad">with the power of AI</span>',
    hero_p: "Take a photo and our AI will identify the disease and suggest treatments.",
    start: "Get started", install: "Install the app",
    stat1: "Disease types", stat2: "In seconds", stat3: "Free advisory line",
    search_title: "Search the disease directory", search_ph: "Rust, Leaf Curl, Blight, Healthy...", search_btn: "Search",
    upload_title: "AI Disease Analysis", upload_p: "Upload a photo of the leaf", upload_small: "JPG, PNG or JPEG (max 5MB)",
    remove: "Remove", analyze: "AI Analysis",
    map_title: "Crop Risk Zone Map", risk_high: "High risk", risk_med: "Medium risk", risk_low: "Low risk",
    demo_note: "Map data is sample (demo) data for now.",
    rent_title: "Equipment Rental", ph_name: "Your name", ph_phone: "Phone number", ph_addr: "Address / village",
    ph_price: "Price per day (Rs.) - optional", rent_submit: "List equipment",
    expert_title: "Agriculture Experts", help_title: "Get Support",
    hotline: "Agriculture Hotline", support247: "", email_h: "Email",
    site_h: "Official website", more_info: "More information",
    footer: "2026 AgriDoctor Pro - AI technology for Sri Lankan farmers",
    offline: "You are offline. Some features are limited.",
    all_districts: "All districts", pick_district: "Select district",
    pick_equipment: "Select equipment", all_equipment: "All equipment",
    badge_default: "AI powered", badge_loading: "🔄 AI loading", badge_ready: "✅ AI ready", badge_none: "⚠️ AI unavailable",
    model_loading: "🔄 Loading the AI model...", model_ok: "✅ AI model loaded! Now upload an image.",
    model_err: "⚠️ Failed to load the AI model. Please check your internet connection.",
    enter_name: "😔 Please enter a disease name.", no_match: "😔 No information found for \"{q}\".",
    no_match_hint: "e.g. rust, leaf curl, blight, powdery mildew, healthy",
    label_sci: "🔬 Scientific name:", label_treat: "💊 Treatment:", label_prevent: "🛡️ Prevention:",
    upload_first: "📷 Please upload an image first!",
    model_wait: "The AI model is still loading... please try again in a few seconds.",
    analyzing: "Analyzing the image... please wait.",
    unsure_title: "🤔 Could not identify the disease",
    unsure_body: "The AI confidence is only {c}%. Take another photo of a single leaf, in good light and in sharp focus.",
    unsure_help: "If you are still unsure, call the agriculture hotline 1920.",
    confidence: "🎯 Confidence:",
    safety: "⚠️ Before using chemicals, read the label for the dose and ask an agriculture officer for advice.",
    analysis_fail: "⚠️ Analysis failed. Please try again.",
    too_big: "The image is larger than 5MB. Please choose a smaller one.",
    no_experts: "No officers listed for this district. Call the agriculture hotline 1920.",
    no_rentals: "No equipment listed yet. You can add the first one.",
    per_day: "Rs. {p} / day", price_neg: "Price negotiable",
    phone_bad: "The phone number must have 10 digits (e.g. 0771234567).",
    listed: "Listed. (For now this data is saved only in your browser.)",
    district_suffix: "District", your_photo: "Your photo", ref_photo: "Example of the disease",
    map_fail: "The map could not be loaded. Check your internet connection. See the list below for the information.",
    tile_fail: "Map tiles failed to load (check your internet connection)."
  }
};


Object.assign(I18N.si, {
    login: "ඇතුල් වන්න", logout: "පිටවන්න", auth_title: "ඇතුල් වන්න / ලියාපදිංචි වන්න",
    email_ph: "ඊමේල් ලිපිනය", pass_ph: "මුරපදය (අවම අකුරු 6ක්)", do_login: "ඇතුල් වන්න", do_register: "ලියාපදිංචි වන්න",
    login_required: "මෙය කිරීමට පළමුව ඇතුල් වන්න (Login).",
    auth_err_cred: "ඊමේල් හෝ මුරපදය වැරදියි.", auth_err_exists: "මෙම ඊමේල් ලිපිනය දැනටමත් ලියාපදිංචි වී ඇත.",
    auth_err_weak: "ඊමේල් නිවැරදිව ඇතුළත් කර, මුරපදය අකුරු 6ක් හෝ ඊට වැඩි විය යුතුයි.",
    auth_err_other: "යමක් වැරදුණා. නැවත උත්සාහ කරන්න.",
    report_btn: "සිතියමට වාර්තා කරන්න", report_ok: "ස්තූතියි! ඔබේ වාර්තාව සිතියමට එකතු කළා.",
    report_hint: "ඔබේ දිස්ත්‍රික්කය තෝරා වාර්තා කළොත් අසල ගොවීන්ට අනතුරු ඇඟවීමට උදව් වේ.",
    backend_err: "සේවාදායකයට සම්බන්ධ විය නොහැකි විය. නැවත උත්සාහ කරන්න.",
    delete_btn: "මකන්න", confirm_delete: "මෙම ලැයිස්තුව මකන්නද?",
    listed_shared: "ලැයිස්තුගත කළා. දැන් සැමට පේනවා."
});
Object.assign(I18N.en, {
    login: "Log in", logout: "Log out", auth_title: "Log in / Register",
    email_ph: "Email address", pass_ph: "Password (min 6 characters)", do_login: "Log in", do_register: "Register",
    login_required: "Please log in first to do this.",
    auth_err_cred: "Incorrect email or password.", auth_err_exists: "This email is already registered.",
    auth_err_weak: "Enter a valid email and a password of at least 6 characters.",
    auth_err_other: "Something went wrong. Please try again.",
    report_btn: "Report to map", report_ok: "Thank you! Your report was added to the map.",
    report_hint: "Selecting your district and reporting helps warn nearby farmers.",
    backend_err: "Could not reach the server. Please try again.",
    delete_btn: "Delete", confirm_delete: "Delete this listing?",
    listed_shared: "Listed. It is now visible to everyone."
});

const DIST_COORDS = { "කොළඹ":[6.9271,79.8612],"ගම්පහ":[7.0917,79.9999],"කළුතර":[6.5854,79.9607],"මහනුවර":[7.2906,80.6337],"මාතලේ":[7.4675,80.6234],"නුවරඑළිය":[6.9497,80.7891],"ගාල්ල":[6.0535,80.2210],"මාතර":[5.9549,80.5550],"හම්බන්තොට":[6.1241,81.1185],"යාපනය":[9.6615,80.0255],"කුරුණෑගල":[7.4863,80.3623],"අනුරාධපුර":[8.3114,80.4037],"පොළොන්නරුව":[7.9403,81.0188],"බදුල්ල":[6.9934,81.0550],"මොනරාගල":[6.8728,81.3507],"රත්නපුර":[6.6828,80.3992],"කෑගල්ල":[7.2513,80.3464],"වව්නියාව":[8.7514,80.4971],"මන්නාරම":[8.9810,79.9044],"මුලතිව්":[9.2671,80.8142],"කිලිනොච්චි":[9.3803,80.3770],"ත්‍රිකුණාමලය":[8.5874,81.2152],"මඩකලපුව":[7.7102,81.6924],"අම්පාර":[7.2975,81.6820],"පුත්තලම":[8.0362,79.8283] };
DISTRICTS.forEach(([si, en]) => {
    const dr = DEMO_RISK[si] || ["low", "සාමාන්‍ය තත්ත්වය", "Normal conditions"];
    if (DIST_COORDS[si]) ZONES.push({ si, en, p: DIST_COORDS[si], r: dr[0], ts: dr[1], te: dr[2] });
});

// ==================== BACKEND (Firebase) STATE & EVENTS ====================
let user = null, rentalsData = null, expertsData = null, reportsData = null;
const beOn = () => !!(window.AgriBackend && window.AgriBackend.enabled);

window.addEventListener('agri:ready', () => { renderAuth(); });
window.addEventListener('agri:auth', (e) => { user = e.detail; renderAuth(); renderRentals(); });
window.addEventListener('agri:rentals', (e) => { rentalsData = e.detail; renderRentals(); });
window.addEventListener('agri:experts', (e) => { expertsData = e.detail; renderExperts(); });
window.addEventListener('agri:reports', (e) => { reportsData = e.detail; renderZones(); });

// සත්‍ය වාර්තා තිබේ නම් (පසුගිය දින 14) ඒවායින් සිතියම; නැත්නම් Demo දත්ත
function getZones() {
    if (!beOn() || !reportsData || !reportsData.length) return ZONES;
    const since = Date.now() - 14 * 864e5;
    const by = {};
    reportsData.filter(r => r.t >= since && DIST_COORDS[r.district]).forEach(r => { (by[r.district] = by[r.district] || []).push(r.disease); });
    const zones = Object.keys(by).map(si => {
        const n = by[si].length, cnt = {};
        by[si].forEach(k => { cnt[k] = (cnt[k] || 0) + 1; });
        const top = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
        const dn = DISEASE_DB[top] ? DISEASE_DB[top].name : top;
        const de = DISEASE_EN[top] ? DISEASE_EN[top].name : top;
        const en = (DISTRICTS.find(x => x[0] === si) || [])[1] || si;
        return { si, en, p: DIST_COORDS[si], r: n >= 5 ? 'high' : n >= 2 ? 'medium' : 'low',
                 ts: `${dn} - වාර්තා ${n}`, te: `${de} - ${n} report(s)` };
    });
    return zones.length ? zones : ZONES;
}


Object.assign(I18N.si, {
    nav_shop: "ඇණවුම්", shop_title: "කෘෂි භාණ්ඩ ඇණවුම් කරන්න",
    shop_note: "දැනට තියෙන්නේ උදාහරණ නිෂ්පාදන සහ මිල. ඇණවුමක් දුන්නාම විකුණුම්කරු ඔබව සම්බන්ධ කරගෙන තහවුරු කරයි. මෙහි මාර්ගගත ගෙවීමක් නැත.",
    cat_fert: "පොහොර", cat_bio: "ජෛව නිෂ්පාදන", cat_seed: "බීජ", cat_tool: "උපකරණ",
    cart_title: "ඔබේ ඇණවුම", cart_empty: "තවම කිසිවක් තෝරා නැත. + බොත්තමෙන් එකතු කරන්න.", cart_total: "මුළු මුදල",
    ph_note: "සටහනක් (අවශ්‍ය නම්)", order_btn: "ඇණවුම තහවුරු කරන්න",
    order_need_items: "කරුණාකර අවම වශයෙන් එක් භාණ්ඩයක් තෝරන්න.",
    order_ok_cloud: "ඇණවුම ලැබුණා! විකුණුම්කරු ඔබව සම්බන්ධ කරගනී.",
    order_ok_local: "ඇණවුම මෙම උපාංගයේ පමණක් සුරැකුණා (backend සම්බන්ධ කර නැත). විකුණුම්කරුට යැවීමට පහත WhatsApp බොත්තම භාවිතා කරන්න.",
    order_wa: "WhatsApp මගින් යවන්න",
    contact_note: "සම්බන්ධතා තොරතුරු කෘෂිකර්ම දෙපාර්තමේන්තුවේ වෙබ් අඩවියෙන් (doa.gov.lk) ලබාගත් ඒවා. භාවිතයට පෙර නිල වෙබ් අඩවියෙන් තහවුරු කරගන්න."
});
Object.assign(I18N.en, {
    nav_shop: "Order", shop_title: "Order Farm Supplies",
    shop_note: "These are sample products and prices for now. After you place an order the seller will contact you to confirm. There is no online payment here.",
    cat_fert: "Fertilizer", cat_bio: "Bio products", cat_seed: "Seeds", cat_tool: "Tools",
    cart_title: "Your order", cart_empty: "Nothing selected yet. Use the + button to add items.", cart_total: "Total",
    ph_note: "Note (optional)", order_btn: "Confirm order",
    order_need_items: "Please select at least one item.",
    order_ok_cloud: "Order received! The seller will contact you.",
    order_ok_local: "Order saved on this device only (no backend connected). Use the WhatsApp button below to send it to the seller.",
    order_wa: "Send via WhatsApp",
    contact_note: "Contact details are taken from the Department of Agriculture website (doa.gov.lk). Please confirm on the official site before use."
});
Object.assign(I18N.si, { stat3: "නොමිලේ උපදේශන සේවය", support247: "" });
Object.assign(I18N.en, { stat3: "Free advisory line", support247: "" });

// ==================== SHOP ====================
const SHOP_WHATSAPP = "";   // විකුණුම්කරුගේ WhatsApp අංකය, ජාත්‍යන්තර ආකෘතියෙන් (උදා: "94771234567"). හිස් නම් WhatsApp බොත්තම පෙන්වන්නේ නැත.
const ORDER_KEY = "agri_orders_v1";
// !!! උදාහරණ නිෂ්පාදන සහ මිල පමණි - ඔබේ ඇත්ත භාණ්ඩ මෙතැනින් වෙනස් කරන්න. (රසායනික පළිබෝධ නාශක මෙහි දැමීමට පෙර නීතිමය අවසර පරීක්ෂා කරන්න.)
const PRODUCTS = [
    { id: "compost", si: "කාබනික කොම්පෝස්ට් (10kg)", en: "Organic compost (10kg)", cat: "fert", price: 1200 },
    { id: "vermi", si: "වර්මි කොම්පෝස්ට් (5kg)", en: "Vermicompost (5kg)", cat: "fert", price: 900 },
    { id: "trich", si: "ට්‍රයිකොඩර්මා ජෛව නිෂ්පාදනය (250g)", en: "Trichoderma bio product (250g)", cat: "bio", price: 850 },
    { id: "neem", si: "කොහොඹ තෙල් (500ml)", en: "Neem oil (500ml)", cat: "bio", price: 1500 },
    { id: "tomato", si: "තක්කාලි බීජ පැකට්ටුව", en: "Tomato seed packet", cat: "seed", price: 250 },
    { id: "chilli", si: "මිරිස් බීජ පැකට්ටුව", en: "Chilli seed packet", cat: "seed", price: 200 },
    { id: "sprayer", si: "අතින් ඉසින යන්ත්‍රය (2L)", en: "Hand sprayer (2L)", cat: "tool", price: 2800 },
    { id: "phkit", si: "පස pH පරීක්ෂණ කට්ටලය", en: "Soil pH test kit", cat: "tool", price: 1800 }
];
let cart = {};
const money = (n) => 'Rs. ' + Number(n).toLocaleString('en-US');
const catLabel = (c) => t('cat_' + c);

function cartItems() { return PRODUCTS.filter(p => cart[p.id] > 0).map(p => ({ ...p, qty: cart[p.id] })); }
function cartTotal() { return cartItems().reduce((a, p) => a + p.price * p.qty, 0); }

function renderShop() {
    const grid = document.getElementById('shopGrid');
    const box = document.getElementById('cartBox');
    if (!grid || !box) return;
    grid.innerHTML = PRODUCTS.map(p => `
        <div class="extra-card prod-card">
            <span class="chip">${esc(catLabel(p.cat))}</span>
            <h4>${esc(lang === 'en' ? p.en : p.si)}</h4>
            <p class="price">${money(p.price)}</p>
            <div class="qty">
                <button type="button" data-qty="-1" data-id="${esc(p.id)}" aria-label="-">&minus;</button>
                <span>${cart[p.id] || 0}</span>
                <button type="button" data-qty="1" data-id="${esc(p.id)}" aria-label="+">+</button>
            </div>
        </div>`).join('');

    const items = cartItems();
    box.innerHTML = `<h4>${esc(t('cart_title'))}</h4>` + (items.length
        ? items.map(p => `<div class="cart-line"><span>${esc(lang === 'en' ? p.en : p.si)} × ${p.qty}</span><span>${money(p.price * p.qty)}</span></div>`).join('')
          + `<div class="cart-total"><span>${esc(t('cart_total'))}</span><span>${money(cartTotal())}</span></div>`
        : `<p class="extra-empty" style="color:var(--text-light);text-align:left">${esc(t('cart_empty'))}</p>`);
}

function whatsappLink(order) {
    const lines = order.items.map(i => `- ${(PRODUCTS.find(p => p.id === i.id) || {}).en || i.id} x ${i.qty} = ${money(i.price * i.qty)}`);
    const text = `AgriDoctor order\n${lines.join('\n')}\nTotal: ${money(order.total)}\nName: ${order.name}\nPhone: ${order.phone}\nDistrict: ${(DISTRICTS.find(x => x[0] === order.district) || [])[1] || order.district}\nAddress: ${order.address}${order.note ? '\nNote: ' + order.note : ''}`;
    return `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

async function submitOrder(e) {
    e.preventDefault();
    const f = e.target, msg = document.getElementById('orderMsg');
    const items = cartItems();
    const phone = f.phone.value.trim();
    if (!items.length) { msg.textContent = t('order_need_items'); return; }
    if (!/^0\d{9}$/.test(phone)) { msg.textContent = t('phone_bad'); return; }

    const order = {
        name: f.name.value.trim(), phone, district: f.district.value,
        address: f.address.value.trim(), note: f.note.value.trim(),
        items: items.map(p => ({ id: p.id, qty: p.qty, price: p.price })), total: cartTotal()
    };
    const wa = SHOP_WHATSAPP ? ` <a href="${whatsappLink(order)}" target="_blank" rel="noopener">${esc(t('order_wa'))}</a>` : '';

    if (beOn()) {
        if (!user) { openAuth(t('login_required')); return; }
        try { await window.AgriBackend.addOrder(order); }
        catch (err) { console.error(err); msg.textContent = t('backend_err'); return; }
        msg.innerHTML = esc(t('order_ok_cloud')) + wa;
    } else {
        let list = [];
        try { list = JSON.parse(localStorage.getItem(ORDER_KEY)) || []; } catch {}
        list.unshift({ ...order, at: Date.now() });
        try { localStorage.setItem(ORDER_KEY, JSON.stringify(list.slice(0, 50))); } catch {}
        msg.innerHTML = esc(t('order_ok_local')) + wa;
    }
    cart = {};
    f.reset();
    renderShop();
}

// ==================== සම්බන්ධතා (doa.gov.lk වෙතින් තහවුරු කළ තොරතුරු) ====================
const CONTACTS = [
    { icon: "fa-phone-alt",
      si: "1920 කෘෂිකර්ම උපදේශන සේවය", en: "1920 Agriculture Advisory Service",
      ds: "ගොවීන්ට නොමිලේ දුරකථන උපදෙස් (ආහාර බෝග, පොල්, කුළුබඩු ආදී)", de: "Free phone advice for farmers (food crops, coconut, spices and more)",
      hs: "නිවාඩු දින හැර දිනපතා, උදේ 8.30 - සවස 4.15", he: "Daily 8.30am - 4.15pm, except holidays",
      lines: [["tel:1920", "1920"], ["https://wa.me/94702201920", "WhatsApp: 070 220 1920"], ["mailto:1920service@doa.gov.lk", "1920service@doa.gov.lk"]] },
    { icon: "fa-building",
      si: "කෘෂිකර්ම දෙපාර්තමේන්තුව - පේරාදෙණිය", en: "Department of Agriculture - Peradeniya",
      ds: "ප්‍රධාන කාර්යාලය", de: "Head office",
      hs: "සඳුදා - සිකුරාදා, උදේ 8.30 - සවස 4.30", he: "Mon - Fri, 8.30am - 4.30pm",
      lines: [["tel:+94812388331", "081 238 8331"], ["tel:+94812388332", "081 238 8332"], ["mailto:info@doa.gov.lk", "info@doa.gov.lk"], ["https://doa.gov.lk", "www.doa.gov.lk"]] },
    { icon: "fa-seedling",
      si: "වී පර්යේෂණ හා සංවර්ධන ආයතනය - බතලගොඩ", en: "Rice Research & Development Institute - Batalagoda",
      ds: "වී රෝග සහ වගා උපදෙස්", de: "Rice diseases and cultivation advice", hs: "", he: "",
      lines: [["tel:+94372258561", "037 225 8561"], ["mailto:rrdi@doa.gov.lk", "rrdi@doa.gov.lk"]] },
    { icon: "fa-info-circle",
      si: "ජාතික කෘෂිකර්ම තොරතුරු හා සන්නිවේදන මධ්‍යස්ථානය", en: "National Agriculture Information & Communication Centre",
      ds: "ගන්නෝරුව, පේරාදෙණිය", de: "Gannoruwa, Peradeniya", hs: "", he: "",
      lines: [["tel:+94812030040", "081 203 0040"], ["mailto:naicc@doa.gov.lk", "naicc@doa.gov.lk"]] },
    { icon: "fa-shield-alt",
      si: "ජාතික ශාක නිරෝධායන සේවය - කටුනායක", en: "National Plant Quarantine Service - Katunayake",
      ds: "ශාක සහ බීජ ආනයන/අපනයන සහ රෝග පාලන නීති", de: "Plant and seed import/export and disease-control rules", hs: "", he: "",
      lines: [["tel:+94112252028", "011 225 2028"], ["tel:+94112252029", "011 225 2029"], ["mailto:npqs@doa.gov.lk", "npqs@doa.gov.lk"]] },
    { icon: "fa-map-marker-alt",
      si: "කළාපීය කෘෂිකර්ම පර්යේෂණ මධ්‍යස්ථානය - කිලිනොච්චි", en: "Regional Agriculture Research & Development Centre - Kilinochchi",
      ds: "උතුරු පළාතේ ගොවීන් සඳහා", de: "For farmers in the Northern Province", hs: "", he: "",
      lines: [["tel:+94212285406", "021 228 5406"]] }
];

function renderContacts() {
    const g = document.getElementById('contactGrid');
    if (!g) return;
    g.innerHTML = CONTACTS.map(c => {
        const en = lang === 'en';
        const hours = en ? c.he : c.hs;
        return `<div class="contact-card">
            <i class="fas ${c.icon}"></i>
            <h4>${esc(en ? c.en : c.si)}</h4>
            <p class="c-desc">${esc(en ? c.de : c.ds)}</p>
            ${c.lines.map(l => `<a class="c-line" href="${esc(l[0])}"${l[0].startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(l[1])}</a>`).join('')}
            ${hours ? `<small class="c-hours">${esc(hours)}</small>` : ''}
        </div>`;
    }).join('');
}

// ==================== STATE ====================
let model = null;
let isModelReady = false;
let lang = 'si';
let lastSearchKey = null;
let lastResult = null;   // { key, prob, src } | { unsure: true, prob, src }
let badgeKey = 'badge_default';
let modelState = null;   // 'loading' | 'ok' | 'err' | null
let map = null;
let mapMarkers = [];

// ==================== DOM ELEMENTS ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const langToggle = document.getElementById('langToggle');
const modelStatusDiv = document.getElementById('modelStatus');
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const preview = document.getElementById('preview');
const resultDisplay = document.getElementById('resultDisplay');
const searchInput = document.getElementById('diseaseSearchInput');
const searchResultDisplay = document.getElementById('searchResultDisplay');
const voiceBtn = document.getElementById('voiceBtn');
const statusBadge = document.getElementById('statusBadge');
const recognitionRef = { r: null };

// ==================== HELPERS ====================
function t(key) {
    return (I18N[lang] && I18N[lang][key]) ?? I18N.si[key] ?? key;
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
}

function pick(pair) { return lang === 'en' ? pair[1] : pair[0]; }
function districtLabel(si) { const d = DISTRICTS.find(x => x[0] === si); return d ? pick(d) : si; }
function equipLabel(v) { const d = EQUIPMENT.find(x => x[0] === v); return d ? pick(d) : v; }

function diseaseView(key) {
    const base = DISEASE_DB[key] || DISEASE_DB['healthy'];
    const en = lang === 'en' ? DISEASE_EN[key] : null;
    return { ...base, name: en ? en.name : base.name, treatment: en ? en.treatment : base.treatment, prevention: en ? en.prevention : base.prevention };
}

// අයිකනය තබාගෙන අකුරු පමණක් වෙනස් කරයි
function setText(el, str) {
    if (!el.children.length) { el.textContent = str; return; }
    let node = null;
    el.childNodes.forEach(n => { if (n.nodeType === 3 && n.nodeValue.trim()) node = n; });
    if (node) node.nodeValue = ' ' + str;
    else el.appendChild(document.createTextNode(' ' + str));
}

function fillSelect(id, pairs, firstKey) {
    const el = document.getElementById(id);
    if (!el) return;
    const cur = el.value;
    el.innerHTML = `<option value="">${esc(t(firstKey))}</option>` +
        pairs.map(p => `<option value="${esc(p[0])}">${esc(pick(p))}</option>`).join('');
    el.value = cur;
}

function setBadge(key) {
    badgeKey = key;
    if (statusBadge) statusBadge.textContent = t(key);
}

function setModelStatus(state) {
    modelState = state;
    if (!modelStatusDiv) return;
    if (state === 'loading') modelStatusDiv.innerHTML = `<div class="loading"><div class="spinner"></div> ${esc(t('model_loading'))}</div>`;
    else if (state === 'ok') modelStatusDiv.innerHTML = `<div class="success">${esc(t('model_ok'))}</div>`;
    else if (state === 'err') modelStatusDiv.innerHTML = `<div class="error">${esc(t('model_err'))}</div>`;
    else modelStatusDiv.innerHTML = '';
}

function imageBlock(key, userSrc) {
    const d = key ? DISEASE_DB[key] : null;
    const mine = userSrc
        ? `<figure><img src="${userSrc}" alt="${esc(t('your_photo'))}"><figcaption>${esc(t('your_photo'))}</figcaption></figure>` : '';
    const ref = d && d.image
        ? `<figure><img src="${esc(d.image)}" alt="${esc(t('ref_photo'))}" onerror="this.parentElement.remove()"><figcaption>${esc(t('ref_photo'))}</figcaption></figure>` : '';
    return (mine || ref) ? `<div class="result-images">${mine}${ref}</div>` : '';
}

// ==================== LANGUAGE ====================
function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => setText(el, t(el.dataset.i18n)));
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    if (langToggle) langToggle.textContent = lang === 'si' ? 'EN' : 'සිං';

    fillSelect('expertDistrict', DISTRICTS, 'all_districts');
    fillSelect('rentDistrict', DISTRICTS, 'pick_district');
    fillSelect('rentType', EQUIPMENT, 'pick_equipment');
    fillSelect('rentFilter', EQUIPMENT, 'all_equipment');
    fillSelect('orderDistrict', DISTRICTS, 'pick_district');

    setBadge(badgeKey);
    setModelStatus(modelState);
    renderExperts();
    renderRentals();
    renderZones();
    renderShop();
    renderContacts();
    renderAuth();
    if (lastSearchKey) displaySearchResult(lastSearchKey);
    if (lastResult) renderResult();
    if (recognitionRef.r) recognitionRef.r.lang = lang === 'en' ? 'en-US' : 'si-LK';
}

function initLang() {
    try { const s = localStorage.getItem(LANG_KEY); if (s === 'en' || s === 'si') lang = s; } catch {}
    langToggle?.addEventListener('click', () => {
        lang = lang === 'si' ? 'en' : 'si';
        try { localStorage.setItem(LANG_KEY, lang); } catch {}
        applyLang();
    });
}

// ==================== DARK MODE ====================
function initDarkMode() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch {}
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        try { localStorage.setItem('theme', isDark ? 'light' : 'dark'); } catch {}
    });
}

// ==================== MAP ====================
function zonePopup(z, demo) {
    return `<b>${esc(lang === 'en' ? z.en : z.si)}</b><br>${esc(lang === 'en' ? z.te : z.ts)}${demo ? '<br><small>Demo data</small>' : ''}`;
}

function renderZones() {
    const box = document.getElementById('zoneList');
    if (!box) return;
    box.innerHTML = getZones().map(z => `
        <div class="extra-card" style="border-left:5px solid ${RISK_COLOR[z.r]}">
            <h4>${esc(lang === 'en' ? z.en : z.si)}</h4>
            <p>${esc(lang === 'en' ? z.te : z.ts)}</p>
        </div>`).join('');
    if (map) drawMarkers();
    if (useSvgMap) renderSvgMap();
    const dn = document.querySelector('[data-i18n="demo_note"]');
    if (dn) dn.style.display = (getZones() === ZONES) ? '' : 'none';
}

// ශ්‍රී ලංකාවේ සරල වෙරළ තීරය [lon, lat] - internet/tiles නැතිවුවත් සිතියම පෙන්වීමට
const SL_OUTLINE = [[80.05,9.81],[80.23,9.83],[80.45,9.60],[80.82,9.27],[81.02,8.95],[81.23,8.57],[81.55,7.93],[81.70,7.72],[81.85,7.20],[81.84,6.84],[81.62,6.45],[81.33,6.22],[81.12,6.12],[80.80,6.02],[80.59,5.92],[80.22,6.03],[80.00,6.42],[79.85,6.93],[79.83,7.21],[79.80,7.57],[79.83,8.03],[79.76,8.23],[79.90,8.98],[79.72,9.08],[80.20,9.50]];
let useSvgMap = false;

function svgXY(lon, lat) { return [((lon - 79.5) * 160).toFixed(1), ((9.95 - lat) * 160).toFixed(1)]; }

function renderSvgMap() {
    const el = document.getElementById('riskMap');
    if (!el) return;
    useSvgMap = true;
    el.style.height = '460px';
    el.style.background = '#cfe6f3';
    const pts = SL_OUTLINE.map(([lo, la]) => svgXY(lo, la).join(',')).join(' ');
    const small = getZones().length > 10;
    const dots = getZones().map(z => {
        const [x, y] = svgXY(z.p[1], z.p[0]);
        const c = RISK_COLOR[z.r];
        const name = esc(lang === 'en' ? z.en : z.si);
        const note = esc(lang === 'en' ? z.te : z.ts);
        return `<g><title>${name} - ${note}</title>
            <circle cx="${x}" cy="${y}" r="${small ? 10 : 16}" fill="${c}" fill-opacity="0.35"/>
            <circle cx="${x}" cy="${y}" r="${small ? 5 : 8}" fill="${c}" stroke="#fff" stroke-width="2"/>
            <text x="${+x + (small ? 9 : 14)}" y="${+y + 4}" font-size="${small ? 10 : 14}" font-weight="600" fill="#12301a" stroke="#fff" stroke-width="3" paint-order="stroke">${name}</text></g>`;
    }).join('');
    el.innerHTML = `<svg viewBox="0 0 400 664" width="100%" height="100%" role="img" aria-label="Sri Lanka risk map" preserveAspectRatio="xMidYMid meet">
        <rect width="400" height="664" fill="#cfe6f3"/>
        <polygon points="${pts}" fill="#9fd0a0" stroke="#3f7d46" stroke-width="3" stroke-linejoin="round"/>
        ${dots}</svg>`;
}

function switchToSvgMap() {
    if (useSvgMap) return;
    try { if (map) { map.remove(); } } catch {}
    map = null;
    mapMarkers = [];
    renderSvgMap();
}

let markerLayer = null;

function drawMarkers() {
    if (!map || !markerLayer) return;
    markerLayer.clearLayers();
    const demo = getZones() === ZONES;
    getZones().forEach(z => {
        L.circleMarker(z.p, { radius: 14, color: RISK_COLOR[z.r], fillColor: RISK_COLOR[z.r], fillOpacity: 0.6 })
            .addTo(markerLayer)
            .bindPopup(zonePopup(z, demo));
    });
}

function initMap(tries = 0) {
    const el = document.getElementById('riskMap');
    if (!el || map || useSvgMap) return;
    if (typeof L === 'undefined') {
        if (tries < 12) { setTimeout(() => initMap(tries + 1), 500); return; }
        renderSvgMap();   // Leaflet load නොවුණොත් සරල සිතියමක්
        return;
    }
    map = L.map(el).setView([7.8731, 80.7718], 7);

    // OpenStreetMap වල නොමිලේ server එක (403) block කළ නිසා CARTO tiles භාවිතා කරයි
    let tileLoaded = false;
    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    tiles.on('tileload', () => { tileLoaded = true; });

    markerLayer = L.layerGroup().addTo(map);
    drawMarkers();

    [200, 800, 2000].forEach(ms => setTimeout(() => map && map.invalidateSize(), ms));
    window.addEventListener('resize', () => map && map.invalidateSize());

    // තත්පර 10ක් ඇතුළත සිතියම් පින්තූර එකක්වත් නොආවොත් සරල සිතියමට මාරු වේ
    setTimeout(() => { if (!tileLoaded) switchToSvgMap(); }, 10000);
}

// ==================== AI MODEL LOADING ====================
async function loadAIModel() {
    if (!modelStatusDiv) return;
    setModelStatus('loading');
    setBadge('badge_loading');

    try {
        if (typeof tmImage === 'undefined') throw new Error('tmImage library not loaded');
        model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        isModelReady = true;
        setModelStatus('ok');
        setBadge('badge_ready');
        setTimeout(() => { if (modelState === 'ok') setModelStatus(null); }, 4000);
    } catch (error) {
        console.error("Model load error:", error);
        isModelReady = false;
        setModelStatus('err');
        setBadge('badge_none');
    }
}

// ==================== SEARCH ====================
function performSearch() {
    if (!searchInput || !searchResultDisplay) return;
    const query = searchInput.value.toLowerCase().trim();
    lastSearchKey = null;

    if (!query) {
        searchResultDisplay.innerHTML = `<div class="search-error">${esc(t('enter_name'))}</div>`;
        return;
    }

    let found = DISEASE_DB[query] ? query : null;
    if (!found) {
        for (const key of Object.keys(DISEASE_DB)) {
            const en = (DISEASE_EN[key]?.name || '').toLowerCase();
            if (key.includes(query) || DISEASE_DB[key].name.includes(query) || en.includes(query)) { found = key; break; }
        }
    }

    if (found) { lastSearchKey = found; displaySearchResult(found); return; }

    searchResultDisplay.innerHTML = `
        <div class="search-error">
            ${esc(t('no_match').replace('{q}', query))}<br>
            <small>${esc(t('no_match_hint'))}</small>
        </div>`;
}

function displaySearchResult(key) {
    const d = diseaseView(key);
    searchResultDisplay.innerHTML = `
        <div class="result-card" style="border-left-color:${SEVERITY_COLOR[d.severity] || '#4caf50'}; margin-top:16px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <span style="font-size:32px">${d.icon}</span>
                <h3 style="margin:0;color:var(--primary)">${esc(d.name)}</h3>
            </div>
            ${imageBlock(key, '')}
            ${d.scientific ? `<p><strong>${esc(t('label_sci'))}</strong> ${esc(d.scientific)}</p>` : ''}
            <p><strong>${esc(t('label_treat'))}</strong><br>${esc(d.treatment)}</p>
            <p><strong>${esc(t('label_prevent'))}</strong><br>${esc(d.prevention)}</p>
        </div>`;
}

// ==================== VOICE ====================
function initVoiceRecognition() {
    if (!voiceBtn) return;

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognitionRef.r = recognition;
        recognition.lang = lang === 'en' ? 'en-US' : 'si-LK';
        recognition.continuous = false;

        voiceBtn.onclick = () => { try { recognition.start(); } catch {} };
        recognition.onstart = () => { voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>'; };
        recognition.onend = () => { voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'; };
        recognition.onerror = () => { voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'; };
        recognition.onresult = (e) => {
            if (searchInput) {
                searchInput.value = e.results[0][0].transcript;
                performSearch();
            }
        };
    } else {
        voiceBtn.style.display = 'none';
    }
}

// ==================== IMAGE UPLOAD ====================
function initImageUpload() {
    if (!uploadArea || !imageInput) return;

    uploadArea.onclick = () => imageInput.click();

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) return;
        if (file.size > MAX_FILE_BYTES) {
            imageInput.value = '';
            alert(t('too_big'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            preview.src = event.target.result;
            previewContainer.style.display = 'block';
            uploadArea.style.display = 'none';
            lastResult = null;
            if (resultDisplay) resultDisplay.innerHTML = '';
        };
        reader.readAsDataURL(file);
    });
}

function removeImage() {
    if (imageInput) imageInput.value = '';
    if (previewContainer) previewContainer.style.display = 'none';
    if (uploadArea) uploadArea.style.display = 'block';
    lastResult = null;
    if (resultDisplay) resultDisplay.innerHTML = '';
}

// ==================== AI ANALYSIS ====================
function reportBlock(key) {
    if (!beOn() || key === 'healthy') return '';
    return `<div class="report-box">
        <select id="reportDistrict" aria-label="${esc(t('pick_district'))}">
            <option value="">${esc(t('pick_district'))}</option>
            ${DISTRICTS.map(p => `<option value="${esc(p[0])}">${esc(pick(p))}</option>`).join('')}
        </select>
        <button type="button" id="reportBtn" class="btn-outline" data-key="${esc(key)}">${esc(t('report_btn'))}</button>
        <p id="reportMsg">${esc(t('report_hint'))}</p>
    </div>`;
}

function renderResult() {
    if (!lastResult || !resultDisplay) return;
    const { key, prob, src, unsure } = lastResult;
    const confidence = (prob * 100).toFixed(1);

    if (unsure) {
        resultDisplay.innerHTML = `
            <div class="result-card" style="border-left-color:#ff9800">
                <h3>${esc(t('unsure_title'))}</h3>
                ${imageBlock(null, src)}
                <p>${esc(t('unsure_body').replace('{c}', confidence))}</p>
                <p>${esc(t('unsure_help'))}</p>
            </div>`;
        return;
    }

    const d = diseaseView(key);
    resultDisplay.innerHTML = `
        <div class="result-card" style="border-left-color:${SEVERITY_COLOR[d.severity] || '#4caf50'}">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <span style="font-size:42px">${d.icon}</span>
                <h3 style="margin:0;color:var(--primary)">${esc(d.name)}</h3>
            </div>
            ${imageBlock(key, src)}
            <div class="confidence-bar"><div class="confidence-fill" style="width:${confidence}%"></div></div>
            <p><strong>${esc(t('confidence'))}</strong> ${confidence}%</p>
            <p style="margin-top:10px"><strong>${esc(t('label_treat'))}</strong><br>${esc(d.treatment)}</p>
            <p style="margin-top:10px"><strong>${esc(t('label_prevent'))}</strong><br>${esc(d.prevention)}</p>
            <p class="safety-note">${esc(t('safety'))}</p>
            ${reportBlock(key)}
        </div>`;
}

async function analyzeDisease() {
    if (!resultDisplay || !preview) return;

    if (!preview.src || previewContainer.style.display !== 'block') {
        resultDisplay.innerHTML = `<div class="notice error">${esc(t('upload_first'))}</div>`;
        return;
    }
    if (!isModelReady || !model) {
        resultDisplay.innerHTML = `<div class="notice warn"><div class="spinner"></div> ${esc(t('model_wait'))}</div>`;
        return;
    }

    resultDisplay.innerHTML = `<div class="notice info"><div class="spinner"></div> ${esc(t('analyzing'))}</div>`;

    try {
        const predictions = await model.predict(preview);
        let best = 0;
        predictions.forEach((p, i) => { if (p.probability > predictions[best].probability) best = i; });

        const prob = predictions[best].probability;
        let key = String(predictions[best].className || '').toLowerCase().trim();
        if (!DISEASE_DB[key]) key = LABELS[best];
        if (!DISEASE_DB[key]) key = 'healthy';

        lastResult = prob < MIN_CONFIDENCE
            ? { unsure: true, prob, src: preview.src }
            : { key, prob, src: preview.src };
        renderResult();

        if (!lastResult.unsure) {
            statusBadge.textContent = '✅ ' + diseaseView(key).name;
            setTimeout(() => setBadge('badge_ready'), 3000);
        }
    } catch (error) {
        console.error("Analysis error:", error);
        resultDisplay.innerHTML = `<div class="notice error">${esc(t('analysis_fail'))}</div>`;
    }
}

// ==================== EXPERT DIRECTORY ====================
function renderExperts() {
    const box = document.getElementById('expertList');
    const sel = document.getElementById('expertDistrict');
    if (!box || !sel) return;
    const list = (expertsData && expertsData.length ? expertsData : EXPERTS).filter(e => !sel.value || e.district === sel.value);

    box.innerHTML = list.length ? list.map(e => `
        <div class="extra-card">
            <h4>${esc(lang === 'en' ? (e.nameEn || e.name) : e.name)}</h4>
            <p>${esc(districtLabel(e.district))} ${esc(t('district_suffix'))}</p>
            <a href="tel:${esc(e.phone)}"><i class="fas fa-phone"></i> ${esc(e.phone)}</a>
            ${e.email ? `<a href="mailto:${esc(e.email)}"><i class="fas fa-envelope"></i> ${esc(e.email)}</a>` : ''}
        </div>`).join('')
        : `<p class="extra-empty">${esc(t('no_experts'))}</p>`;
}

// ==================== EQUIPMENT RENTAL ====================
function loadRentals() {
    try { return JSON.parse(localStorage.getItem(RENT_KEY)) || []; }
    catch { return []; }
}

function currentRentals() {
    return (beOn() && rentalsData) ? rentalsData : loadRentals();
}

function renderRentals() {
    const box = document.getElementById('rentList');
    const sel = document.getElementById('rentFilter');
    if (!box || !sel) return;
    const list = currentRentals().filter(r => !sel.value || r.type === sel.value);

    box.innerHTML = list.length ? list.map(r => `
        <div class="extra-card">
            <h4>${esc(equipLabel(r.type))}</h4>
            <p>${esc(districtLabel(r.district))} | ${esc(r.address)}</p>
            <p>${r.price ? esc(t('per_day').replace('{p}', r.price)) : esc(t('price_neg'))}</p>
            <a href="tel:${esc(r.phone)}"><i class="fas fa-phone"></i> ${esc(r.owner)} - ${esc(r.phone)}</a>
            ${(r.id && user && r.uid === user.uid) ? `<button type="button" class="del-btn" data-del="${esc(r.id)}">${esc(t('delete_btn'))}</button>` : ''}
        </div>`).join('')
        : `<p class="extra-empty">${esc(t('no_rentals'))}</p>`;
}

async function submitRental(e) {
    e.preventDefault();
    const f = e.target;
    const msg = document.getElementById('rentMsg');
    const phone = f.phone.value.trim();

    if (!/^0\d{9}$/.test(phone)) { msg.textContent = t('phone_bad'); return; }

    const rec = {
        owner: f.owner.value.trim(), phone,
        type: f.type.value, district: f.district.value,
        address: f.address.value.trim(), price: f.price.value.trim()
    };

    if (beOn()) {
        if (!user) { openAuth(t('login_required')); return; }
        try {
            await window.AgriBackend.addRental(rec);
            f.reset();
            msg.textContent = t('listed_shared');
        } catch (err) { console.error(err); msg.textContent = t('backend_err'); }
        return;
    }

    const list = loadRentals();
    list.unshift(rec);
    try { localStorage.setItem(RENT_KEY, JSON.stringify(list.slice(0, 100))); } catch {}
    f.reset();
    msg.textContent = t('listed');
    renderRentals();
}

// ==================== LOGIN ====================
function renderAuth() {
    const b = document.getElementById('authBtn');
    if (!b) return;
    if (!beOn()) { b.style.display = 'none'; return; }
    b.style.display = '';
    b.textContent = user ? `${t('logout')} (${(user.email || '').split('@')[0]})` : t('login');
}

function openAuth(note) {
    const m = document.getElementById('authModal');
    if (!m) return;
    document.getElementById('authNote').textContent = note || '';
    document.getElementById('authMsg').textContent = '';
    m.hidden = false;
    document.getElementById('authEmail').focus();
}

function closeAuth() { const m = document.getElementById('authModal'); if (m) m.hidden = true; }

function authErrorText(code) {
    if (/invalid-credential|wrong-password|user-not-found/.test(code)) return t('auth_err_cred');
    if (/email-already-in-use/.test(code)) return t('auth_err_exists');
    if (/weak-password|invalid-email|missing/.test(code)) return t('auth_err_weak');
    return t('auth_err_other');
}

async function doAuth(kind) {
    const email = document.getElementById('authEmail').value.trim();
    const pass = document.getElementById('authPass').value;
    const msg = document.getElementById('authMsg');
    if (!email || pass.length < 6) { msg.textContent = t('auth_err_weak'); return; }
    try {
        await window.AgriBackend[kind](email, pass);
        document.getElementById('authPass').value = '';
        closeAuth();
    } catch (err) { console.error(err); msg.textContent = authErrorText(String(err.code || err.message || '')); }
}

function initExtras() {
    document.getElementById('expertDistrict')?.addEventListener('change', renderExperts);
    document.getElementById('rentFilter')?.addEventListener('change', renderRentals);
    document.getElementById('rentForm')?.addEventListener('submit', submitRental);
    document.getElementById('orderForm')?.addEventListener('submit', submitOrder);
    document.getElementById('shopGrid')?.addEventListener('click', (e) => {
        const b = e.target.closest('[data-qty]');
        if (!b) return;
        const id = b.dataset.id;
        cart[id] = Math.max(0, Math.min(99, (cart[id] || 0) + Number(b.dataset.qty)));
        renderShop();
    });

    document.getElementById('authBtn')?.addEventListener('click', () => {
        if (user) window.AgriBackend.signOut(); else openAuth('');
    });
    document.getElementById('authClose')?.addEventListener('click', closeAuth);
    document.getElementById('authModal')?.addEventListener('click', (e) => { if (e.target.id === 'authModal') closeAuth(); });
    document.getElementById('doLogin')?.addEventListener('click', () => doAuth('signIn'));
    document.getElementById('doRegister')?.addEventListener('click', () => doAuth('signUp'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuth(); });

    // රෝග වාර්තාව සහ මකා දැමීම (result/list නැවත ඇඳෙන නිසා delegation)
    document.addEventListener('click', async (e) => {
        const rb = e.target.closest('#reportBtn');
        if (rb) {
            const sel = document.getElementById('reportDistrict');
            const msg = document.getElementById('reportMsg');
            if (!user) { openAuth(t('login_required')); return; }
            if (!sel.value) { msg.textContent = t('pick_district'); return; }
            try {
                await window.AgriBackend.addReport({ disease: rb.dataset.key, district: sel.value });
                msg.textContent = t('report_ok');
                rb.disabled = true;
            } catch (err) { console.error(err); msg.textContent = t('backend_err'); }
            return;
        }
        const db = e.target.closest('[data-del]');
        if (db && confirm(t('confirm_delete'))) {
            try { await window.AgriBackend.deleteRental(db.dataset.del); }
            catch (err) { console.error(err); alert(t('backend_err')); }
        }
    });
}

// ==================== EVENT LISTENERS ====================
document.getElementById('searchBtn')?.addEventListener('click', performSearch);
searchInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

// ==================== PAGE START ====================
// DOMContentLoaded: CDN files ගොඩක් load වෙනතුරු බලා නොසිට buttons වහාම වැඩ කරයි.
function safeInit(name, fn) {
    try { fn(); } catch (err) { console.error('Init failed:', name, err); }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("AgriDoctor Pro v2.2");
    safeInit('lang', initLang);
    safeInit('darkMode', initDarkMode);
    safeInit('voice', initVoiceRecognition);
    safeInit('upload', initImageUpload);
    safeInit('extras', initExtras);
    safeInit('applyLang', applyLang);
    safeInit('map', () => setTimeout(initMap, 100));
});

// AI library එක (defer) සූදානම් වූ පසු model එක load කරන්න
window.addEventListener('load', () => safeInit('model', loadAIModel));
