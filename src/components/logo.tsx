import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"svg"> {
  loading?: boolean;
}

export function Logo({ loading, ...props }: Props) {
  return (
    <svg
      suppressHydrationWarning
      {...props}
      className={twMerge([
        loading && "animate-pulse",
        "delay-0",
        props.className,
      ])}
      viewBox="0 0 1000.000000 1152.000000"
    >
      <path
        fill="white"
        d="M211 11507c-6-8-16-49-21-93-6-43-34-224-61-401s-56-384-64-460c-19-176-19-457-1-643 8-80 22-253 31-385 8-132 22-343 31-470 8-126 24-315 34-420 24-225 25-413 5-509-8-38-41-126-74-196-67-142-76-169-66-200 6-20 491-574 521-595 9-7 18-5 29 5 13 13 12 37-10 205-67 513-128 1121-205 2055-41 505-48 633-39 720 9 81 68 360 79 373 4 5 79-79 166-185 294-357 602-709 922-1053 61-66 125-145 141-175s93-228 171-440 149-397 156-412c15-28 23-32 58-28 11 1 298 191 637 421 481 327 620 426 629 449 10 23 10 83 0 277-6 136-16 263-22 281-5 18-24 43-41 56-18 12-144 83-282 156-630 336-869 465-1740 948-362 200-508 307-761 554-100 98-189 178-197 178s-20-6-26-13zM9571 11346c-97-96-204-197-237-224-184-147-753-471-2024-1151-289-155-535-292-547-306-24-28-27-49-42-345-5-107-7-208-4-224s22-45 42-65c77-75 1200-831 1235-831 36 0 59 36 109 172 259 701 264 713 340 804 40 49 343 386 584 652 62 68 186 210 275 315 266 316 291 342 300 321 14-37 68-301 77-384 10-87-18-528-69-1105-34-380-184-1768-196-1806-6-20 20-43 40-36 8 3 58 59 112 124s153 174 220 243 131 144 143 168c51 100 38 180-59 367-69 133-71 142-45 381 22 210 61 723 90 1159 14 215 29 451 35 526 22 295 13 395-95 1057-25 151-45 285-45 298 0 25-31 64-51 64-6 0-91-78-188-174zM4910 10121c-28-9-437-159-849-310-151-56-283-109-294-118-16-16-18-25-11-68 17-106 11-175-24-258-17-43-32-81-32-83s24 10 53 27c115 68 339 170 467 213 155 51 325 89 497 110 65 8 132 20 148 27 45 17 190 16 270-3 39-10 122-24 185-33 290-40 578-136 835-278 50-27 101-57 115-67 14-9 30-20 37-24 7-3-7 37-29 91-44 105-51 160-34 270 8 47 6 54-15 75-13 13-76 43-139 66-995 361-1003 364-1080 368-41 2-86 0-100-5zM4805 9200c-227-23-436-81-630-174-226-108-383-216-549-376-549-530-743-1316-504-2048 160-494 538-918 1014-1138 740-342 1655-196 2227 355 535 516 725 1322 483 2056-72 218-155 374-302 571-248 332-633 589-1039 694-212 55-501 80-700 60zm412-745c246-47 457-159 638-340 261-259 399-633 366-989-13-134-51-294-94-390-34-76-35-71 32-108 38-21 42-60 9-82-13-8-58-20-100-27-43-6-78-15-78-20 0-18-164-179-236-231-105-75-289-170-392-202-176-55-419-72-593-41-286 50-605 246-774 476-107 145-167 274-212 456-23 94-27 129-27 268-1 220 32 360 130 552 196 385 543 636 959 692 91 13 268 6 372-14z"
        transform="matrix(.1 0 0 -.1 0 1152)"
      />
      <path
        fill="white"
        d="M5086 8252c-3-5 9-21 28-35 54-42 61-71 46-192-7-57-16-109-20-115-14-23-230-80-302-80-38 0-68-4-68-8s18-26 41-47c83-81 89-114 89-504 1-389-17-544-80-688-13-31-20-62-16-76 3-13 28-55 56-95 75-106 93-101 296 78 117 103 206 202 266 295 22 33 45 60 51 60 7 0 44-49 84-110 107-163 94-153 203-170 52-8 129-15 170-15 83 0 200 16 214 30 5 5-23 25-65 46-128 64-271 154-364 230-96 78-242 220-234 228 3 3 63 42 134 86 150 94 177 117 173 144-4 25-90 87-147 106-43 14-63 8-43-12 7-7 12-17 12-24 0-17-189-214-205-214-7 0-41 35-74 77-45 56-58 79-49 85 25 15 108 8 149-13 23-11 47-18 54-16 23 9 112 200 149 317 19 64 47 137 61 163 14 27 25 59 25 72 0 27-42 65-111 101-55 27-92 30-140 10-43-18-149-31-149-19 0 5 14 49 30 98 34 102 37 136 13 157-32 28-265 70-277 50zm375-384c5-57-71-370-96-398-10-11-38-21-70-25-30-3-94-17-142-30s-91-21-94-19c-4 2-2 27 2 56 5 29 12 68 15 86 4 29 8 32 41 32 19 0 76 10 126 21 158 37 190 61 126 94-43 23-96 21-200-6l-91-23-33 39c-19 22-34 43-35 47-1 20 179 89 305 118 97 22 145 25 146 8zm-203-667c35-51 62-101 60-110s-18-24-37-33l-34-17 63-3 64-3 32-55c18-30 33-62 34-72 0-21-50-60-180-138s-226-124-245-116c-10 3-13 14-10 33 10 54 35 429 35 516v88l33-6c17-3 46-1 62 4 17 5 37 9 45 8s43-44 78-96zM4500 8171c0-6 5-20 11-30 7-10 9-29 6-42-9-34-64-118-82-126-9-3-51 6-94 20-42 15-109 29-147 33-82 9-83 11 41-97 47-41 85-81 85-90 0-19-79-95-164-159-32-24-53-46-46-48 22-8 134 20 209 50 88 37 92 35 111-70 6-37 13-78 16-91 4-20 2-22-13-16-10 4-28 10-40 12-22 5-22 4-12-27 16-45 1-87-75-213-83-137-193-285-273-368-38-40-60-70-54-74 16-9 130 22 176 50 46 26 149 132 239 243 32 39 61 72 63 72 7 0-6-349-18-485-6-66-15-115-23-123-11-11-28-11-102 3-48 9-103 23-121 30-18 8-33 10-33 4 0-14 224-242 284-288 58-45 90-51 106-21 6 11 18 66 27 122 14 82 17 175 17 463 1 367-7 501-45 784l-19 144 110 107c64 63 110 116 110 127 0 44-96 98-193 109-40 5-57 3-57-5zM8464 8996c-10-25 1-602 21-1066 12-276 20-386 31-415 18-48 647-890 687-919 25-18 55-21 347-34 177-8 327-11 335-8 38 14 11 47-147 177-246 201-304 255-391 364-100 124-183 219-351 403-72 78-144 165-159 191-33 58-28 41-207 736-77 303-145 559-149 570-9 19-9 19-17 1zM1523 8992c-11-7-256-949-293-1127-27-132-45-166-136-265-44-47-189-209-324-360-296-332-313-348-492-498-79-66-156-133-171-150-28-29-28-30-8-37 21-6 526 10 629 21 37 4 62 13 84 32 42 35 599 780 637 852 57 106 60 133 71 634 6 253 15 557 20 675 6 118 7 218 3 222-5 5-13 5-20 1zM7173 8245c45-90 112-282 157-450 9-32 25-52 90-104 117-95 117-96 37-257l-67-134v-113c0-138-22-326-57-472-14-60-28-121-31-135-4-19 34 12 148 120 322 304 660 643 666 667 5 18-1 33-22 58-30 35-890 828-926 855-19 13-18 10 5-35zM2350 7835c-239-221-443-414-453-428-12-15-17-32-13-45 10-30 776-776 776-756 0 5-11 59-25 119-36 162-55 328-55 485v139l-50 102c-27 56-50 112-50 123 0 13 28 48 73 91l73 70 32 123c18 67 54 179 82 249 27 70 48 128 47 129s-198-180-437-401zM997 6718c-63-84-311-418-552-743C204 5651 5 5378 3 5370c-12-52 17-39 325 145 172 102 319 188 328 192 21 8-2-36-174-342-284-503-434-781-439-811-5-28 1-36 53-80 101-84 152-139 160-169 9-35-55-335-132-617-30-108-54-200-54-203s9-5 19-5c19 0 76 60 281 295 58 66 140 157 182 203 80 87 104 133 95 186-3 17-46 151-96 297-50 147-91 278-91 292s4 37 10 51c5 14 193 215 417 448s442 459 485 503c97 102 102 114 78 202-64 231-263 889-272 900-6 7-23 13-39 13-26 0-42-17-142-152zM8820 6850c-6-12-47-143-90-293s-102-344-129-432c-54-170-62-230-36-291 9-21 94-117 208-232 106-109 313-320 460-470 269-273 306-320 307-384 0-15-39-141-86-280-123-361-121-352-102-391 9-17 71-93 139-167 67-74 180-201 250-281 71-81 136-150 144-153 29-11 28 25-4 137-17 62-52 209-77 327-54 252-60 342-27 406 23 44 75 94 123 119 36 19 50 43 50 90 0 28-31 92-139 283-332 593-462 834-459 851 3 16 33 1 193-97 241-146 426-252 442-252 20 0 15 34-10 71-40 58-1049 1413-1070 1437-26 28-72 29-87 2zM2438 5922c-30-33-58-72-60-87-8-38 14-73 147-240 65-82 198-253 294-380 96-126 213-277 260-335 126-155 309-332 458-445 72-55 244-191 382-303 138-111 257-205 264-208 8-3 20 2 27 11 10 12 4 76-39 368-29 193-58 361-66 373-20 31-1567 1297-1590 1302-16 3-36-12-77-56zM7179 5738c-162-134-516-425-786-646-440-361-494-408-507-445-8-23-36-190-61-370-46-326-47-357-14-357 4 0 68 48 141 107s212 170 308 247c394 314 608 518 755 720 197 269 266 359 422 553 187 234 201 258 178 306-21 44-103 127-125 127-9 0-150-109-311-242zM2323 5560c-25-10-30-39-12-71 6-11 69-189 139-395 71-205 139-393 151-416 14-28 154-177 393-418 205-206 388-400 408-430 19-30 55-93 78-140s115-220 203-384c198-369 263-510 388-836 61-161 102-255 110-255 12 0 14 101 17 600 2 555 1 603-15 635-11 20-73 81-153 148-566 476-921 826-1169 1152-139 182-154 210-266 490-118 295-134 320-206 326-24 2-54-1-66-6zM7574 5560c-38-15-61-57-144-268-96-239-166-382-223-455-128-162-470-552-591-673-78-77-199-188-271-246-265-214-489-417-514-463l-23-44-6-601c-4-441-2-600 6-600 19 0 38 38 92 180 89 237 200 487 351 790 264 529 429 775 688 1025 340 329 427 420 459 481 17 33 83 212 146 397s124 357 135 383c12 26 21 55 21 66 0 32-75 49-126 28z"
        transform="matrix(.1 0 0 -.1 0 1152)"
      />
      <path
        fill="white"
        d="M1276 5504c-10-12-77-185-148-385-72-200-144-402-161-449-42-117-46-215-17-476 29-258 32-247-129-428-330-370-504-572-528-609-28-44-82-172-83-196 0-26 52-1 156 74 126 90 537 416 739 585 146 122 275 220 290 220 4 0-185-197-421-437-235-241-471-482-523-535-81-84-92-98-76-104 42-17 384 88 1005 306 344 121 451 150 626 170 169 20 181 57-131-389-151-217-275-399-275-404 0-18 66 2 237 72 225 92 476 203 689 306 184 88 198 101 172 153-43 85-348 581-373 607-17 16-139 86-270 154-132 68-296 153-363 188-119 62-125 64-148 48-13-8-24-13-24-11 0 20-212 1508-218 1531l-8 30-18-21zM8701 5500c-10-22-52-310-166-1148-36-268-44-303-72-335-20-22-357-202-472-252-128-57-216-112-302-193s-144-162-209-292c-24-47-73-132-110-190-83-130-87-143-52-180 31-34 437-221 881-406 153-64 184-73 196-54 3 5-120 188-273 407-198 282-275 399-264 402 63 14 449-83 779-196 513-175 687-231 835-268 81-20 153-35 159-33 15 5-54 79-513 553-398 411-436 454-348 391 87-63 120-89 371-288 372-294 604-466 616-454 10 9-36 141-65 186-27 42-316 381-525 615-137 155-145 176-122 356 46 371 33 477-97 794-25 61-80 213-123 338-43 126-86 238-95 250l-18 22-11-25z"
        transform="matrix(.1 0 0 -.1 0 1152)"
      />
      <path
        fill="white"
        d="M1905 4941c-3-10-14-68-25-128-10-59-25-138-32-176-15-81-2-156 36-221 14-22 122-165 242-316 497-631 739-973 990-1400l109-184 123-356c68-195 206-602 308-905 102-302 201-584 222-625 53-109 130-182 262-249 58-30 116-62 130-71 14-10 135-79 270-155s248-139 253-142c4-2 7 5 7 16 0 23-54 89-200 246-176 189-174 187-475 740-238 436-202 306-290 1055-124 1064-109 964-152 1048-32 61-81 117-329 375-160 166-540 563-844 882-363 381-561 581-576 583s-24-3-29-17zM7764 4658c-400-420-1206-1260-1335-1393-58-61-114-125-123-143-19-37-69-424-131-1002-34-325-60-502-91-625-47-190-132-390-218-518-25-37-62-100-82-140-119-235-284-465-502-699-56-60-82-96-82-112 0-22 38-2 436 230 240 139 443 262 450 271 16 23 298 811 357 1003 25 80 69 222 97 315 134 443 362 912 656 1351 114 171 219 312 611 815 165 212 310 408 324 435 32 65 30 159-8 359-25 133-31 150-49 153-16 2-90-70-310-300z"
        transform="matrix(.1 0 0 -.1 0 1152)"
      />
      <path
        fill="white"
        d="M5542 4248c-7-7-12-15-12-19 0-5-75-144-167-310-91-167-173-323-182-348-14-41-16-186-21-1271-3-674-9-1230-13-1237-13-20-77-33-160-33-73 0-81 2-106 28-26 26-29 35-36 142-4 63-9 576-10 1140-3 914-5 1034-20 1110-40 201-124 401-274 655-46 77-86 142-89 145-19 19 15-90 52-165 64-129 70-162 52-303-9-64-20-171-26-237-5-67-19-181-30-255s-20-168-20-209c0-112 139-1001 236-1511 25-129 49-268 54-309 11-86-1-184-29-240-26-51-105-121-175-156-66-33-88-59-79-94 3-13 87-125 185-249 98-123 205-263 237-311 65-96 82-114 102-106 8 3 40 46 73 95 32 49 137 188 233 307 187 233 207 264 198 293-3 10-61 58-128 106-167 120-177 129-177 176 0 22 58 389 130 816 166 995 164 983 164 1227 0 172-4 222-28 360-58 344-42 541 59 710 19 32 35 59 35 61 0 8-17 3-28-8z"
        transform="matrix(.1 0 0 -.1 0 1152)"
      />
    </svg>
  );
}
