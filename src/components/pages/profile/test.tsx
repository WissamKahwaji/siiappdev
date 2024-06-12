// import React from "react";

// const test = () => {
//   return (
//     <div className="flex flex-row gap-x-1 md:gap-x-8 md:justify-center w-full">
//       <div className="md:hidden relative">
//         {/* <img
//             src={user.user?.profileImage ?? defaultImage}
//             alt="profile"
//             className=" object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[130px]"
//           /> */}
//         <ImagePopup
//           src={user.user?.profileImage ?? defaultImage}
//           alt="profile"
//           smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] h-[100px] w-[130px]"
//           largeClassName="h-[300px] w-[300px]"
//         />
//         {user.user._id === userId && (
//           <Link to={"/account/edit-profile"}>
//             <div className="absolute bottom-0 p-1 rounded-lg  bg-gray-200  opacity-35 right-0">
//               <FontAwesomeIcon icon={faCamera} width={14} height={14} />
//             </div>
//           </Link>
//         )}
//       </div>
//       <div className="hidden md:flex md:flex-col">
//         <div className="relative rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px]">
//           {/* <img
//               src={user.user?.profileImage ?? defaultImage}
//               alt="profile"
//               className=" object-contain  md:h-full md:w-full"
//               onClick={handleImageClick}
//             />
//             {isPopupOpen && (
//               <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//                 <div className="relative">
//                   <img
//                     src={user.user?.profileImage ?? defaultImage}
//                     alt="profile enlarged"
//                     className="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 h-[300px] w-[300px]"
//                   />
//                   <button
//                     className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
//                     onClick={closePopup}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               </div>
//             )} */}
//           <ImagePopup
//             src={user.user?.profileImage ?? defaultImage}
//             alt="profile"
//             smallClassName="object-cover rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 md:h-[150px] md:w-[150px] min-h-[100px] min-w-[130px]"
//             largeClassName="h-[300px] w-[300px]"
//           />
//           {user.user._id === userId && (
//             <Link to={"/account/edit-profile"}>
//               <div className="absolute bottom-0 p-1 rounded-lg bg-gray-200  opacity-60 right-0 cursor-pointer">
//                 <FontAwesomeIcon icon={faCamera} width={14} height={14} />
//               </div>
//             </Link>
//           )}
//         </div>
//         <div className="font-header mt-4 text-lg   max-w-[240px]  overflow-hidden whitespace-pre-wrap">
//           <p className="text-sm  font-bold">{user?.user?.fullName}</p>
//           {user.user.isBusiness && (
//             <Link to={`/users/${user.user.userCategory}`} className="w-auto">
//               <p className="text-sm font-header text-blue-500 font-bold cursor-pointer w-auto">
//                 {user.user.userCategory}
//               </p>
//             </Link>
//           )}
//           <p className="text-base">
//             {user?.user?.bio ? user.user.bio : "write your bio in settings"}
//           </p>
//         </div>
//         {user.user.userAbout &&
//           (user.user.userAbout.aboutUs ||
//             user.user.userAbout.ourMission ||
//             user.user.userAbout.ourVision) && (
//             <Link to={`/${user.user.userName}/about`}>
//               <p className="underline text-secondary font-serif font-semibold text-sm my-2 cursor-pointer w-fit">
//                 {t("read_more_About_us")}
//               </p>
//             </Link>
//           )}
//       </div>
//       <div className="flex flex-col w-full md:w-auto">
//         {userId === user.user._id ? (
//           <div className="flex flex-row  md:gap-x-10 h-fit md:items-center md:justify-between items-center  justify-between  cursor-pointer">
//             <div
//               className="flex flex-row justify-center items-center md:gap-x-2 gap-x-1"
//               onClick={() => setIsAddAccountModalOpen(true)}
//             >
//               <p className="text-sm ml-4 md:ml-0 font-semibold ">
//                 {user.user?.userName}
//               </p>
//               <FaArrowDown className="text-secondary md:w-4 md:h-4 w-4 h-4" />
//             </div>

//             <div className="flex flex-row md:gap-x-4 gap-x-2">
//               {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
//                   <FontAwesomeIcon icon={faBell} className="" />
//                 </div> */}
//               <div className="relative group">
//                 <div
//                   className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
//                   onClick={() => setIsQrModalOpen(true)}
//                 >
//                   <FontAwesomeIcon icon={faQrcode} className="" />
//                 </div>
//                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   QR Code
//                 </div>
//               </div>

//               <div
//                 className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 <FontAwesomeIcon icon={faAdd} className="" />
//               </div>
//               <Link to="/account/edit-profile">
//                 <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md">
//                   <FontAwesomeIcon icon={faEdit} className="" />
//                 </div>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-row justify-between items-center">
//             <p className="text-sm  font-semibold ">{user.user?.userName}</p>
//             <div className="flex flex-row gap-x-2 md:gap-x-3">
//               {/* <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
//                   <FontAwesomeIcon icon={faBell} className="" />
//                 </div> */}
//               <div className="relative group">
//                 <div
//                   className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer"
//                   onClick={() => setIsQrModalOpen(true)}
//                 >
//                   <FontAwesomeIcon icon={faQrcode} className="" />
//                 </div>
//                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   QR Code
//                 </div>
//               </div>
//               <div
//                 className=" px-2 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer"
//                 onClick={() => {
//                   setIsMoreModalOpen(true);
//                 }}
//               >
//                 <FontAwesomeIcon icon={faList} className="" />
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="md:hidden justify-start items-start mt-3">
//           <div className="flex flex-row justify-center mt-3 capitalize gap-x-8 w-full">
//             <div className="text-primary font-header flex flex-col items-center justify-center">
//               <p className="font-semibold text-sm">{user.user?.posts.length}</p>
//               <p className="text-xs">{t("posts")}</p>
//             </div>
//             <div
//               className="text-primary font-header flex flex-col items-center justify-center cursor-pointer"
//               onClick={() => {
//                 if (user.user._id === userId) {
//                   navigate("/account/followings");
//                 }
//               }}
//             >
//               <p className="font-semibold text-sm">
//                 {user.user?.followings.length}
//               </p>
//               <p className="text-xs">{t("follows")}</p>
//             </div>
//             <div
//               className="text-primary font-header flex flex-col items-center justify-center"
//               onClick={() => {
//                 if (user.user._id === userId) {
//                   navigate("/account/followers");
//                 }
//               }}
//             >
//               <p className="font-semibold text-sm">{followersCount}</p>
//               <p className="text-xs">{t("followers")}</p>
//             </div>
//           </div>
//           {userId !== user.user._id && (
//             <div className="flex flex-row justify-center mt-3 capitalize gap-x-3 w-full">
//               <div
//                 className="  w-28 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
//                 onClick={handleToggleFollow}
//               >
//                 <p className="font-serif  font-semibold text-xs md:text-sm">
//                   {isFollowed ? t("following") : t("follow")}
//                 </p>
//               </div>
//               <div
//                 className="w-28   px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
//                 onClick={handleShareClick}
//               >
//                 <p className="font-serif  font-semibold text-xs">
//                   {t("share_profile")}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="hidden md:flex md:flex-col  group perspective-1000  items-center justify-center my-2 md:min-w-[530px]">
//           <div
//             className={`hidden ${
//               userId === user.user._id ? "justify-center" : "md:justify-start"
//             } md:w-full items-start md:flex md:mt-2`}
//           >
//             <div className="flex flex-row items-center justify-center w-full gap-x-12  mb-2 capitalize">
//               <div className="text-primary font-header flex flex-col items-center justify-center">
//                 <p className="font-semibold">{user?.user?.posts.length}</p>
//                 <p className="text-sm">{t("posts")}</p>
//               </div>
//               <div
//                 className="text-primary font-header flex flex-col items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   if (user.user._id === userId) {
//                     navigate("/account/followings");
//                   }
//                 }}
//               >
//                 <p className="font-semibold">{user?.user?.followings.length}</p>
//                 <p className="text-sm">{t("following")}</p>
//               </div>
//               <div
//                 className="text-primary font-header flex flex-col items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   if (user.user._id === userId) {
//                     navigate("/account/followers");
//                   }
//                 }}
//               >
//                 <p className="font-semibold">{followersCount}</p>
//                 <p className="text-sm">{t("followers")}</p>
//               </div>
//             </div>
//           </div>

//           {userId === user.user._id ? (
//             <div className=" bg-secondary rounded-xl px-4 py-8 ">
//               <div className="flex flex-row justify-between items-center">
//                 <div className="flex flex-col w-1/2">
//                   <h2 className="text-navBackground font-serif text-lg font-bold flex items-center">
//                     <img src={logo} alt="" className="w-12 h-auto mr-1" />{" "}
//                     {t("premium_card")}
//                   </h2>
//                   <p className="text-navBackground text-base font-semibold mt-1">
//                     {t("premium_card_info")}
//                   </p>
//                   <div
//                     className="mt-3 text-sm flex items-center gap-x-2 cursor-pointer w-fit p-2 bg-navBackground rounded-xl text-secondary font-serif font-semibold"
//                     onClick={() => {
//                       user.user?.siiCard
//                         ? navigate("/sii-card")
//                         : navigate(`/get-sii-card/${user.user?.userName}`);
//                     }}
//                   >
//                     <p>
//                       {user.user?.siiCard
//                         ? t("show_details")
//                         : t("get_sii_card_now")}
//                     </p>
//                     <FontAwesomeIcon icon={faArrowRight} />
//                   </div>
//                 </div>
//                 <img src={yellowCardBack} alt="" className="w-36 mr-3" />
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-row justify-center items-center gap-x-8 mt-10 w-full">
//               <div
//                 className="w-40 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
//                 onClick={handleToggleFollow}
//               >
//                 <p className="font-serif  font-semibold text-xs md:text-sm">
//                   {isFollowed ? t("follows") : t("follow")}
//                 </p>
//               </div>
//               <div
//                 className="w-40  px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
//                 onClick={handleShareClick}
//               >
//                 <p className="font-serif  font-semibold text-sm">
//                   {t("share_profile")}
//                 </p>
//               </div>
//               {/* <div
//                   className="w-40 px-3 py-1 shadow-lg flex justify-center items-center bg-secondary rounded-md cursor-pointer hover:text-secondary hover:bg-navBackground duration-300 transform ease-in-out"
//                   onClick={() => {
//                     setIsMoreModalOpen(true);
//                   }}
//                 >
//                   <p className="font-serif font-semibold text-sm ">Message</p>
//                 </div> */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default test;
