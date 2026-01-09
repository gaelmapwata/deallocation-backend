/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const now = new Date();
    await queryInterface.bulkInsert('countries', [
      {
        id: 1, label: 'Aruba', code2: 'AW', code3: 'ABW', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 2, label: 'Afghanistan', code2: 'AF', code3: 'AFG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 3, label: 'Angola', code2: 'AO', code3: 'AGO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 4, label: 'Anguilla', code2: 'AI', code3: 'AIA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 5, label: 'Albania', code2: 'AL', code3: 'ALB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 6, label: 'Andorra', code2: 'AD', code3: 'AND', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 7, label: 'Netherlands Antilles', code2: 'AN', code3: 'ANT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 8, label: 'United Arab Emirates', code2: 'AE', code3: 'ARE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 9, label: 'Argentina', code2: 'AR', code3: 'ARG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 10, label: 'Armenia', code2: 'AM', code3: 'ARM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 11, label: 'American Samoa', code2: 'AS', code3: 'ASM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 12, label: 'Antarctica', code2: 'AQ', code3: 'ATA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 13, label: 'French Southern territories', code2: 'TF', code3: 'ATF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 14, label: 'Antigua and Barbuda', code2: 'AG', code3: 'ATG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 15, label: 'Australia', code2: 'AU', code3: 'AUS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 16, label: 'Austria', code2: 'AT', code3: 'AUT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 17, label: 'Azerbaijan', code2: 'AZ', code3: 'AZE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 18, label: 'Burundi', code2: 'BI', code3: 'BDI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 19, label: 'Belgium', code2: 'BE', code3: 'BEL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 20, label: 'Benin', code2: 'BJ', code3: 'BEN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 21, label: 'Burkina Faso', code2: 'BF', code3: 'BFA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 22, label: 'Bangladesh', code2: 'BD', code3: 'BGD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 23, label: 'Bulgaria', code2: 'BG', code3: 'BGR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 24, label: 'Bahrain', code2: 'BH', code3: 'BHR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 25, label: 'Bahamas', code2: 'BS', code3: 'BHS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 26, label: 'Bosnia and Herzegovina', code2: 'BA', code3: 'BIH', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 27, label: 'Belarus', code2: 'BY', code3: 'BLR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 28, label: 'Belize', code2: 'BZ', code3: 'BLZ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 29, label: 'Bermuda', code2: 'BM', code3: 'BMU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 30, label: 'Bolivia', code2: 'BO', code3: 'BOL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 31, label: 'Brazil', code2: 'BR', code3: 'BRA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 32, label: 'Barbados', code2: 'BB', code3: 'BRB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 33, label: 'Brunei', code2: 'BN', code3: 'BRN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 34, label: 'Bhutan', code2: 'BT', code3: 'BTN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 35, label: 'Bouvet Island', code2: 'BV', code3: 'BVT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 36, label: 'Botswana', code2: 'BW', code3: 'BWA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 37, label: 'Central African Republic', code2: 'CF', code3: 'CAF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 38, label: 'Canada', code2: 'CA', code3: 'CAN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 39, label: 'Cocos (Keeling) Islands', code2: 'CC', code3: 'CCK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 40, label: 'Switzerland', code2: 'CH', code3: 'CHE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 41, label: 'Chile', code2: 'CL', code3: 'CHL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 42, label: 'China', code2: 'CN', code3: 'CHN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 43, label: "Côte d'Ivoire", code2: 'CI', code3: 'CIV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 44, label: 'Cameroon', code2: 'CM', code3: 'CMR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 45, label: 'Congo, The Democratic Republic of the', code2: 'CD', code3: 'COD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 46, label: 'Congo', code2: 'CG', code3: 'COG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 47, label: 'Cook Islands', code2: 'CK', code3: 'COK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 48, label: 'Colombia', code2: 'CO', code3: 'COL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 49, label: 'Comoros', code2: 'KM', code3: 'COM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 50, label: 'Cape Verde', code2: 'CV', code3: 'CPV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 51, label: 'Costa Rica', code2: 'CR', code3: 'CRI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 52, label: 'Cuba', code2: 'CU', code3: 'CUB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 53, label: 'Christmas Island', code2: 'CX', code3: 'CXR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 54, label: 'Cayman Islands', code2: 'KY', code3: 'CYM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 55, label: 'Cyprus', code2: 'CY', code3: 'CYP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 56, label: 'Czech Republic', code2: 'CZ', code3: 'CZE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 57, label: 'Germany', code2: 'DE', code3: 'DEU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 58, label: 'Djibouti', code2: 'DJ', code3: 'DJI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 59, label: 'Dominica', code2: 'DM', code3: 'DMA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 60, label: 'Denmark', code2: 'DK', code3: 'DNK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 61, label: 'Dominican Republic', code2: 'DO', code3: 'DOM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 62, label: 'Algeria', code2: 'DZ', code3: 'DZA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 63, label: 'Ecuador', code2: 'EC', code3: 'ECU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 64, label: 'Egypt', code2: 'EG', code3: 'EGY', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 65, label: 'Eritrea', code2: 'ER', code3: 'ERI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 66, label: 'Western Sahara', code2: 'EH', code3: 'ESH', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 67, label: 'Spain', code2: 'ES', code3: 'ESP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 68, label: 'Estonia', code2: 'EE', code3: 'EST', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 69, label: 'Ethiopia', code2: 'ET', code3: 'ETH', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 70, label: 'Finland', code2: 'FI', code3: 'FIN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 71, label: 'Fiji Islands', code2: 'FJ', code3: 'FJI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 72, label: 'Falkland Islands', code2: 'FK', code3: 'FLK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 73, label: 'France', code2: 'FR', code3: 'FRA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 74, label: 'Faroe Islands', code2: 'FO', code3: 'FRO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 75, label: 'Micronesia, Federated States of', code2: 'FM', code3: 'FSM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 76, label: 'Gabon', code2: 'GA', code3: 'GAB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 77, label: 'United Kingdom', code2: 'GB', code3: 'GBR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 78, label: 'Georgia', code2: 'GE', code3: 'GEO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 79, label: 'Ghana', code2: 'GH', code3: 'GHA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 80, label: 'Gibraltar', code2: 'GI', code3: 'GIB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 81, label: 'Guinea', code2: 'GN', code3: 'GIN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 82, label: 'Guadeloupe', code2: 'GP', code3: 'GLP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 83, label: 'Gambia', code2: 'GM', code3: 'GMB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 84, label: 'Guinea-Bissau', code2: 'GW', code3: 'GNB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 85, label: 'Equatorial Guinea', code2: 'GQ', code3: 'GNQ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 86, label: 'Greece', code2: 'GR', code3: 'GRC', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 87, label: 'Grenada', code2: 'GD', code3: 'GRD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 88, label: 'Greenland', code2: 'GL', code3: 'GRL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 89, label: 'Guatemala', code2: 'GT', code3: 'GTM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 90, label: 'French Guiana', code2: 'GF', code3: 'GUF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 91, label: 'Guam', code2: 'GU', code3: 'GUM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 92, label: 'Guyana', code2: 'GY', code3: 'GUY', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 93, label: 'Hong Kong', code2: 'HK', code3: 'HKG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 94, label: 'Heard Island and McDonald Islands', code2: 'HM', code3: 'HMD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 95, label: 'Honduras', code2: 'HN', code3: 'HND', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 96, label: 'Croatia', code2: 'HR', code3: 'HRV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 97, label: 'Haiti', code2: 'HT', code3: 'HTI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 98, label: 'Hungary', code2: 'HU', code3: 'HUN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 99, label: 'Indonesia', code2: 'ID', code3: 'IDN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 100, label: 'India', code2: 'IN', code3: 'IND', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 101, label: 'British Indian Ocean Territory', code2: 'IO', code3: 'IOT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 102, label: 'Ireland', code2: 'IE', code3: 'IRL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 103, label: 'Iran', code2: 'IR', code3: 'IRN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 104, label: 'Iraq', code2: 'IQ', code3: 'IRQ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 105, label: 'Iceland', code2: 'IS', code3: 'ISL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 106, label: 'Israel', code2: 'IL', code3: 'ISR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 107, label: 'Italy', code2: 'IT', code3: 'ITA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 108, label: 'Jamaica', code2: 'JM', code3: 'JAM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 109, label: 'Jordan', code2: 'JO', code3: 'JOR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 110, label: 'Japan', code2: 'JP', code3: 'JPN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 111, label: 'Kazakstan', code2: 'KZ', code3: 'KAZ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 112, label: 'Kenya', code2: 'KE', code3: 'KEN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 113, label: 'Kyrgyzstan', code2: 'KG', code3: 'KGZ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 114, label: 'Cambodia', code2: 'KH', code3: 'KHM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 115, label: 'Kiribati', code2: 'KI', code3: 'KIR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 116, label: 'Saint Kitts and Nevis', code2: 'KN', code3: 'KNA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 117, label: 'South Korea', code2: 'KR', code3: 'KOR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 118, label: 'Kuwait', code2: 'KW', code3: 'KWT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 119, label: 'Laos', code2: 'LA', code3: 'LAO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 120, label: 'Lebanon', code2: 'LB', code3: 'LBN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 121, label: 'Liberia', code2: 'LR', code3: 'LBR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 122, label: 'Libyan Arab Jamahiriya', code2: 'LY', code3: 'LBY', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 123, label: 'Saint Lucia', code2: 'LC', code3: 'LCA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 124, label: 'Liechtenstein', code2: 'LI', code3: 'LIE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 125, label: 'Sri Lanka', code2: 'LK', code3: 'LKA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 126, label: 'Lesotho', code2: 'LS', code3: 'LSO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 127, label: 'Lithuania', code2: 'LT', code3: 'LTU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 128, label: 'Luxembourg', code2: 'LU', code3: 'LUX', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 129, label: 'Latvia', code2: 'LV', code3: 'LVA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 130, label: 'Macao', code2: 'MO', code3: 'MAC', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 131, label: 'Morocco', code2: 'MA', code3: 'MAR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 132, label: 'Monaco', code2: 'MC', code3: 'MCO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 133, label: 'Moldova', code2: 'MD', code3: 'MDA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 134, label: 'Madagascar', code2: 'MG', code3: 'MDG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 135, label: 'Maldives', code2: 'MV', code3: 'MDV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 136, label: 'Mexico', code2: 'MX', code3: 'MEX', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 137, label: 'Marshall Islands', code2: 'MH', code3: 'MHL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 138, label: 'Macedonia', code2: 'MK', code3: 'MKD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 139, label: 'Mali', code2: 'ML', code3: 'MLI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 140, label: 'Malta', code2: 'MT', code3: 'MLT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 141, label: 'Myanmar', code2: 'MM', code3: 'MMR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 142, label: 'Mongolia', code2: 'MN', code3: 'MNG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 143, label: 'Northern Mariana Islands', code2: 'MP', code3: 'MNP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 144, label: 'Mozambique', code2: 'MZ', code3: 'MOZ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 145, label: 'Mauritania', code2: 'MR', code3: 'MRT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 146, label: 'Montserrat', code2: 'MS', code3: 'MSR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 147, label: 'Martinique', code2: 'MQ', code3: 'MTQ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 148, label: 'Mauritius', code2: 'MU', code3: 'MUS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 149, label: 'Malawi', code2: 'MW', code3: 'MWI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 150, label: 'Malaysia', code2: 'MY', code3: 'MYS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 151, label: 'Mayotte', code2: 'YT', code3: 'MYT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 152, label: 'Namibia', code2: 'NA', code3: 'NAM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 153, label: 'New Caledonia', code2: 'NC', code3: 'NCL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 154, label: 'Niger', code2: 'NE', code3: 'NER', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 155, label: 'Norfolk Island', code2: 'NF', code3: 'NFK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 156, label: 'Nigeria', code2: 'NG', code3: 'NGA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 157, label: 'Nicaragua', code2: 'NI', code3: 'NIC', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 158, label: 'Niue', code2: 'NU', code3: 'NIU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 159, label: 'Netherlands', code2: 'NL', code3: 'NLD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 160, label: 'Norway', code2: 'NO', code3: 'NOR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 161, label: 'Nepal', code2: 'NP', code3: 'NPL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 162, label: 'Nauru', code2: 'NR', code3: 'NRU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 163, label: 'New Zealand', code2: 'NZ', code3: 'NZL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 164, label: 'Oman', code2: 'OM', code3: 'OMN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 165, label: 'Pakistan', code2: 'PK', code3: 'PAK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 166, label: 'Panama', code2: 'PA', code3: 'PAN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 167, label: 'Pitcairn', code2: 'PN', code3: 'PCN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 168, label: 'Peru', code2: 'PE', code3: 'PER', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 169, label: 'Philippines', code2: 'PH', code3: 'PHL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 170, label: 'Palau', code2: 'PW', code3: 'PLW', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 171, label: 'Papua New Guinea', code2: 'PG', code3: 'PNG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 172, label: 'Poland', code2: 'PL', code3: 'POL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 173, label: 'Puerto Rico', code2: 'PR', code3: 'PRI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 174, label: 'North Korea', code2: 'KP', code3: 'PRK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 175, label: 'Portugal', code2: 'PT', code3: 'PRT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 176, label: 'Paraguay', code2: 'PY', code3: 'PRY', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 177, label: 'Palestine', code2: 'PS', code3: 'PSE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 178, label: 'French Polynesia', code2: 'PF', code3: 'PYF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 179, label: 'Qatar', code2: 'QA', code3: 'QAT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 180, label: 'Réunion', code2: 'RE', code3: 'REU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 181, label: 'Romania', code2: 'RO', code3: 'ROM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 182, label: 'Russian Federation', code2: 'RU', code3: 'RUS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 183, label: 'Rwanda', code2: 'RW', code3: 'RWA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 184, label: 'Saudi Arabia', code2: 'SA', code3: 'SAU', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 185, label: 'Sudan', code2: 'SD', code3: 'SDN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 186, label: 'Senegal', code2: 'SN', code3: 'SEN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 187, label: 'Singapore', code2: 'SG', code3: 'SGP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 188, label: 'South Georgia and the South Sandwich Islands', code2: 'GS', code3: 'SGS', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 189, label: 'Saint Helena', code2: 'SH', code3: 'SHN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 190, label: 'Svalbard and Jan Mayen', code2: 'SJ', code3: 'SJM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 191, label: 'Solomon Islands', code2: 'SB', code3: 'SLB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 192, label: 'Sierra Leone', code2: 'SL', code3: 'SLE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 193, label: 'El Salvador', code2: 'SV', code3: 'SLV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 194, label: 'San Marino', code2: 'SM', code3: 'SMR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 195, label: 'Somalia', code2: 'SO', code3: 'SOM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 196, label: 'Saint Pierre and Miquelon', code2: 'PM', code3: 'SPM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 197, label: 'Sao Tome and Principe', code2: 'ST', code3: 'STP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 198, label: 'Suriname', code2: 'SR', code3: 'SUR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 199, label: 'Slovakia', code2: 'SK', code3: 'SVK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 200, label: 'Slovenia', code2: 'SI', code3: 'SVN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 201, label: 'Sweden', code2: 'SE', code3: 'SWE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 202, label: 'Swaziland', code2: 'SZ', code3: 'SWZ', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 203, label: 'Seychelles', code2: 'SC', code3: 'SYC', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 204, label: 'Syria', code2: 'SY', code3: 'SYR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 205, label: 'Turks and Caicos Islands', code2: 'TC', code3: 'TCA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 206, label: 'Chad', code2: 'TD', code3: 'TCD', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 207, label: 'Togo', code2: 'TG', code3: 'TGO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 208, label: 'Thailand', code2: 'TH', code3: 'THA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 209, label: 'Tajikistan', code2: 'TJ', code3: 'TJK', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 210, label: 'Tokelau', code2: 'TK', code3: 'TKL', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 211, label: 'Turkmenistan', code2: 'TM', code3: 'TKM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 212, label: 'East Timor', code2: 'TP', code3: 'TMP', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 213, label: 'Tonga', code2: 'TO', code3: 'TON', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 214, label: 'Trinidad and Tobago', code2: 'TT', code3: 'TTO', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 215, label: 'Tunisia', code2: 'TN', code3: 'TUN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 216, label: 'Turkey', code2: 'TR', code3: 'TUR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 217, label: 'Tuvalu', code2: 'TV', code3: 'TUV', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 218, label: 'Taiwan', code2: 'TW', code3: 'TWN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 219, label: 'Tanzania', code2: 'TZ', code3: 'TZA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 220, label: 'Uganda', code2: 'UG', code3: 'UGA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 221, label: 'Ukraine', code2: 'UA', code3: 'UKR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 222, label: 'United States Minor Outlying Islands', code2: 'UM', code3: 'UMI', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 223, label: 'Uruguay', code2: 'UY', code3: 'URY', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 224, label: 'United States', code2: 'US', code3: 'USA', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 225, label: 'Uzbekistan', code2: 'UZ', code3: 'UZB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 226, label: 'Holy See (Vatican City State)', code2: 'VA', code3: 'VAT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 227, label: 'Saint Vincent and the Grenadines', code2: 'VC', code3: 'VCT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 228, label: 'Venezuela', code2: 'VE', code3: 'VEN', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 229, label: 'Virgin Islands, British', code2: 'VG', code3: 'VGB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 230, label: 'Virgin Islands, U.S.', code2: 'VI', code3: 'VIR', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 231, label: 'Vietnam', code2: 'VN', code3: 'VNM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 232, label: 'Vanuatu', code2: 'VU', code3: 'VUT', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 233, label: 'Wallis and Futuna', code2: 'WF', code3: 'WLF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 234, label: 'Samoa', code2: 'WS', code3: 'WSM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 235, label: 'Yemen', code2: 'YE', code3: 'YEM', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 236, label: 'Yugoslavia', code2: 'YU', code3: 'YUG', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 237, label: 'South Africa', code2: 'ZA', code3: 'ZAF', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 238, label: 'Zambia', code2: 'ZM', code3: 'ZMB', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
      {
        id: 239, label: 'Zimbabwe', code2: 'ZW', code3: 'ZWE', tel_prefix_num: null, createdAt: now, updatedAt: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('countries', {}, {});
  },
};
